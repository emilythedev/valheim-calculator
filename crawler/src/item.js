import axios from 'axios';
import * as cheerio from 'cheerio';
import { apiBaseUrl } from './constants.js';

const parseMaterialText = (material) => {
  // Parse material text. E.g. Stone x4 or 4x Stone
  const matches = material.match(/(?<q1>[0-9]+) ?[x×] (?<t1>[a-zA-Z :]+)|(?<t2>[a-zA-Z :]+) [x×] ?(?<q2>[0-9]+)/);
  if (!matches) return material;  // return original string if failed to parse

  const grp = matches.groups;

  return {
    title: (grp.t1 || grp.t2 || '').trim(),
    quantity: parseInt(grp.q1 || grp.q2 || 0),
  };
};

const transformItemData = (item) => {
  let source = ['Crafting', 'None'].includes(item.source) ? null : item.source;
  if (source === 'StonecutterHoe') {
    source = 'Stonecutter, Hoe';
  }

  const levels = item.levels.map(({ level, craftingLevel, materials }) => {
    craftingLevel = parseInt(craftingLevel);
    if (isNaN(craftingLevel)) {
      craftingLevel = null;
    }

    materials = typeof materials === 'string' ?
      [parseMaterialText(materials)]:
      materials.map(parseMaterialText);

    return { level, craftingLevel, materials };
  });
  return {
    ...item,
    internalId: item.internalId || null, // no data
    source,
    levels,
  };
};

export const getItemByPageId = async (id) => {
  const params = {
    action: 'parse',
    prop: 'text|categories',
    pageid: id,
    format: 'json',
  };

  const { data } = await axios.get(apiBaseUrl, { params });
  const $ = cheerio.load(data.parse.text['*']);
  const $info = $('aside[role=region]');

  // Get crafting materials from infobox
  // May have multiple tabs for different levels
  const levels = $info.find('section h3.pi-data-label:contains("Crafting Materials")')
    .map((i, el) => {
      const $this = $(el);
      let materials = $(el).siblings('.pi-data-value').find('li');
      if (materials.length > 0) {
        materials = materials.map((i, el) => $(el).text()).toArray();
      } else {
        materials = materials.prevObject.text();
      }
      let craftingLevel = $this.parent()
        .siblings('section.pi-item.pi-group')
        .has('th:contains("Crafting Level")')
        .find('td')
        .first()
        .text();

      return {
        level: i + 1,
        craftingLevel,
        materials,
      };
    })
    .toArray();

  // Get upgrade structures from content
  const upgradeNameIdx = [322, 688].includes(id) ? 1 : 2; // Workbench and Cauldron is exception
  const upgrades = $('h2').has('> #Upgrades')
    .siblings('table')
    .first()
    .find(`tbody > tr:not(:last-child) > td:nth-child(${upgradeNameIdx})`)
    .map((i, el) => $(el).text().trim())
    .toArray();

  // Get internal ID from infobox
  const internalId = $info.find('div.pi-item > h3.pi-data-label:contains("Internal ID")')
    .first()
    .siblings('.pi-data-value')
    .first()
    .text()
    .trim();
  // Get required crafting station from infobox
  let source = $info.find('div.pi-item > h3.pi-data-label:contains("Source")');
  if (source.length === 0) {
    source = $info.find('div.pi-item > h3.pi-data-label:contains("Dropped by")');
  }
  source = source.first()
    .siblings('.pi-data-value')
    .first()
    .text()
    .trim();

  return transformItemData({
    title: data.parse.title,
    pageId: id,
    internalId,
    source,
    levels,
    upgrades,
    categories: data.parse.categories.map(cat => cat['*']),
  });
};
