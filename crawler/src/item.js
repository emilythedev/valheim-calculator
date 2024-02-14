import axios from 'axios';
import * as cheerio from 'cheerio';
import { apiBaseUrl } from './constants.js';

const labelKeyMappings = {
  'Source': 'source',
  'Internal ID': 'internalId',
};

export const getItemInfo = async (item) => {
  const params = {
    action: 'parse',
    prop: 'text',
    pageid: item.pageId,
    format: 'json',
  };

  const { data } = await axios.get(apiBaseUrl, { params });
  const htmlContent = data.parse.text['*'];

  const $ = cheerio.load(htmlContent);
  const $info = $('aside[role=region]');

  const materials = $info.find('section h3.pi-data-label:contains("Crafting Materials")')
    .map((i, el) => {
      const $this = $(el);
      const materials = $(el).siblings('.pi-data-value').find('li').map((i, el) => $(el).text()).toArray();
      const craftingLevel = $this.parent()
        .siblings('section.pi-item.pi-group')
        .has('th:contains("Crafting Level")')
        .find('td')
        .first()
        .text();
      return {
        level: i + 1,
        craftingLevel: craftingLevel || null,
        materials,
      };
    })
    .toArray();

  const info = {
    internalId: $info.find('div.pi-item > h3.pi-data-label:contains("Internal ID")')
      .first()
      .siblings('.pi-data-value')
      .first()
      .text(),
    source: $info.find('div.pi-item > h3.pi-data-label:contains("Source")')
      .first()
      .siblings('.pi-data-value')
      .first()
      .text(),
    materials,
  };


  return { ...item, ...info };
};

// TODO: Upgrades section
