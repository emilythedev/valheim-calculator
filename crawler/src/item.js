import axios from 'axios';
import * as cheerio from 'cheerio';
import { apiBaseUrl } from './constants.js';

const parseMaterialText = (material) => {
  const matches = material.match(/(?<q1>[0-9]+) ?x (?<t1>[a-zA-Z ]+)|(?<t2>[a-zA-Z ]+) x ?(?<q2>[0-9]+)/);
  if (!matches) return material;

  const grp = matches.groups;

  return {
    title: (grp.t1 || grp.t2 || '').trim(),
    quantity: parseInt(grp.q1 || grp.q2 || 0),
  };
};

export const getItemByPageId = async (id) => {
  const params = {
    action: 'parse',
    prop: 'text',
    pageid: id,
    format: 'json',
  };

  const { data } = await axios.get(apiBaseUrl, { params });
  const $ = cheerio.load(data.parse.text['*']);
  const $info = $('aside[role=region]');

  const materials = $info.find('section h3.pi-data-label:contains("Crafting Materials")')
    .map((i, el) => {
      const $this = $(el);
      const materials = $(el).siblings('.pi-data-value')
        .find('li').map((i, el) => parseMaterialText($(el).text()))
        .toArray();
      const craftingLevel = $this.parent()
        .siblings('section.pi-item.pi-group')
        .has('th:contains("Crafting Level")')
        .find('td')
        .first()
        .text();

      return {
        level: i + 1,
        craftingLevel: parseInt(craftingLevel || 0) || null,
        materials,
      };
    })
    .toArray();

  const upgrades = $('h2').has('> #Upgrades')
    .siblings('table')
    .first()
    .find('tbody > tr:not(:last-child) > td:nth-child(2)')
    .map((i, el) => $(el).text().trim())
    .toArray();

  const internalId = $info.find('div.pi-item > h3.pi-data-label:contains("Internal ID")')
    .first()
    .siblings('.pi-data-value')
    .first()
    .text()
    .trim();
  const source = $info.find('div.pi-item > h3.pi-data-label:contains("Source")')
    .first()
    .siblings('.pi-data-value')
    .first()
    .text()
    .trim();

  return {
    title: data.parse.title,
    pageId: id,
    internalId,
    source,
    materials,
    upgrades: upgrades.length > 0 ? upgrades : null,
  };
};

// TODO: Upgrades section
