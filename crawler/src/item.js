import axios from 'axios';
import * as cheerio from 'cheerio';
import { apiBaseUrl } from './constants.js';

const parseMaterialText = (material) => {
  // Parse material text. E.g. Stone x4 or 4x Stone
  const matches = material.match(/(?<q1>[0-9]+) ?x (?<t1>[a-zA-Z ]+)|(?<t2>[a-zA-Z ]+) x ?(?<q2>[0-9]+)/);
  if (!matches) return material;  // return original string if failed to parse

  const grp = matches.groups;

  return {
    title: (grp.t1 || grp.t2 || '').trim(),
    quantity: parseInt(grp.q1 || grp.q2 || 0),
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
  const materials = $info.find('section h3.pi-data-label:contains("Crafting Materials")')
    .map((i, el) => {
      const $this = $(el);
      const materials = $(el).siblings('.pi-data-value')
        .find('li').map((i, el) => parseMaterialText($(el).text()))
        .toArray();
      let craftingLevel = $this.parent()
        .siblings('section.pi-item.pi-group')
        .has('th:contains("Crafting Level")')
        .find('td')
        .first()
        .text();
      craftingLevel = parseInt(craftingLevel);

      return {
        level: i + 1,
        craftingLevel: !isNaN(craftingLevel) ? craftingLevel : null,
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
  let source = $info.find('div.pi-item > h3.pi-data-label:contains("Source")')
    .first()
    .siblings('.pi-data-value')
    .first()
    .text()
    .trim();
  if (!source) {
    source = $info.find('div.pi-item > h3.pi-data-label:contains("Dropped by")')
      .first()
      .siblings('.pi-data-value')
      .first()
      .text()
      .trim();
  }

  return {
    title: data.parse.title,
    pageId: id,
    internalId,
    source: source !== 'None' ? source : '',
    materials,
    upgrades: upgrades.length > 0 ? upgrades : null,
    categories: data.parse.categories.map(cat => cat['*']).join(', '),
  };
};
