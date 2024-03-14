import axios from 'axios';
import * as cheerio from 'cheerio';
import { apiBaseUrl } from './constants.js';

const parseMaterialText = (material) => {
  // Parse material text. E.g. Stone x4 or 4x Stone
  const matches = material.match(/(?<q1>[0-9]+) ?[x×] (?<t1>[a-zA-Z :]+)|(?<t2>[a-zA-Z :]+) [x×] ?(?<q2>[0-9]+)/);
  if (!matches) {
    return {
      title: material,
      quantity: 0,
    };
  }

  const grp = matches.groups;

  return {
    title: (grp.t1 || grp.t2 || '').trim(),
    quantity: parseInt(grp.q1 || grp.q2 || 0),
  };
};

const parseCraftingMaterials = ($sectionTitle, $, i = 0) => {
  const $content = $sectionTitle.siblings('.pi-data-value');

  let craftingAmount = $content.find('b').text();
  const matches = craftingAmount.match(/Crafts (?<amount>[0-9]+)/);
  craftingAmount = matches ? parseInt(matches.groups.amount) : 1;

  let materials = $content.find('li');
  if (materials.length > 0) {
    materials = materials.map((i, el) => {
      return parseMaterialText($(el).text());
    }).toArray();
  } else {
    materials = [parseMaterialText(materials.prevObject.text())];
  }

  let craftingLevel = $sectionTitle.parent()
    .siblings('section.pi-item.pi-group')
    .has('th:contains("Crafting Level")')
    .find('td')
    .first()
    .text();
  craftingLevel = parseInt(craftingLevel);
  if (isNaN(craftingLevel)) {
    craftingLevel = null;
  }

  return {
    level: i + 1,
    craftingLevel,
    materials,
    craftingAmount,
  };
}

const parseUpgradesFromSection = ($sectionTitle, $, pageId) => {
  const titleColIdx = [322, 688].includes(pageId) ? 1 : 2; // Workbench and Cauldron is exception
  return $sectionTitle
    .siblings('table')
    .first()
    .find(`tbody > tr:not(:last-child) > td:nth-child(${titleColIdx})`)
    .map((i, el) => $(el).text().trim())
    .toArray();
};

const parseSourceAndInternalId = ($info) => {
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

  if (source === 'StonecutterHoe') {
    source = ['Stonecutter', 'Hoe'];
  } else {
    source = ['Crafting', 'None'].includes(source) ? null : [source];
  }

  return {
    internalId: internalId || null,
    source,
  };
};


export const getItemsByPageId = async (id) => {
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
      return parseCraftingMaterials($(el), $, i);
    })
    .toArray();

  // Get upgrade structures from content
  const upgrades = parseUpgradesFromSection($('h2').has('> #Upgrades'), $, id);

  const moreInfo = parseSourceAndInternalId($info);

  return [{
    title: data.parse.title,
    pageId: id,
    ...moreInfo,
    levels,
    upgrades,
    categories: data.parse.categories.map(cat => cat['*']),
  }];
};
