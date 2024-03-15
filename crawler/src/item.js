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

const parseCraftingMaterials = ($sectionTitle, i = 0) => {
  const $content = $sectionTitle.siblings('.pi-data-value');

  let craftingAmount = $content.find('b').text();
  const matches = craftingAmount.match(/Crafts (?<amount>[0-9]+)/);
  craftingAmount = matches ? parseInt(matches.groups.amount) : 1;

  let materials = $content.find('li');
  if (materials.length > 0) {
    materials = materials.map((i, el) => {
      return parseMaterialText(cheerio.load(el).text());
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
    qualityLevel: i + 1,
    craftingLevel,
    materials,
    craftingAmount,
  };
}

const parseUpgradesFromSection = ($sectionTitle, pageId) => {
  if (!$sectionTitle.length) return [];

  const titleColIdx = [322, 688].includes(pageId) ? 1 : 2; // Workbench and Cauldron is exception
  return $sectionTitle
    .siblings('table')
    .first()
    .find(`tbody > tr:not(:last-child) > td:nth-child(${titleColIdx})`)
    .map((i, el) => cheerio.load(el).text().trim())
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
    source = ['Crafting', 'None', 'n/a'].includes(source) ? null : source.split(', ');
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
  const categories = data.parse.categories.map(cat => cat['*']);

  const $info = $('aside[role=region]');

  if ($info.length > 1) {
    return $info.map((i, el) => {
      return parseItem(id, categories, $(el), $);
    }).toArray();
  } else if ($info.length === 0 && categories.includes('Armor')) {
    return parseArmorSetItems(id, categories, $);
  }

  return [
    parseItem(id, categories, $info.first(), $)
  ];
};

const parseItem = (pageId, categories, $info, $) => {
  // Get upgrade structures from content
  const upgrades = parseUpgradesFromSection($('h2').has('> #Upgrades'), pageId);
  const item = parseSingleItemFromInfobox($info, $);

  return {
    pageId,
    ...item,
    upgrades,
    categories,
  };
};

const parseSingleItemFromInfobox = ($info, $) => {
  const title = $info.find('h2').first().text();

  // Get crafting materials from infobox
  // May have multiple tabs for different quality
  const qualityLevels = $info.find('section h3.pi-data-label:contains("Crafting Materials")')
    .map((i, el) => {
      return parseCraftingMaterials($(el), i);
    })
    .toArray();

  return {
    title,
    ...parseSourceAndInternalId($info),
    qualityLevels,
  };
};

const ironArmorSourceInfo = [
  {
    head: {source: ['Forge'], craftingLevel: 1},
    chest: {source: ['Forge'], craftingLevel: 2},
    legs: {source: ['Forge'], craftingLevel: 2},
  },
  {
    head: {source: ['Forge'], craftingLevel: 2},
    chest: {source: ['Forge'], craftingLevel: 3},
    legs: {source: ['Forge'], craftingLevel: 3},
  },
  {
    head: {source: ['Forge'], craftingLevel: 3},
    chest: {source: ['Forge'], craftingLevel: 4},
    legs: {source: ['Forge'], craftingLevel: 4},
  },
  {
    head: {source: ['Forge'], craftingLevel: 4},
    chest: {source: ['Forge'], craftingLevel: 5},
    legs: {source: ['Forge'], craftingLevel: 5},
  },
];

const armorTypes = ['head', 'chest', 'legs', 'cape'];
const parseArmorSetItems = (pageId, categories, $) => {
  const $qualityTabs = $('.wds-tabber > .wds-tab__content');

  const items = {};

  // For each quality
  $qualityTabs.each((iTab, el) => {
    const $tab = $(el);

    // Parse crafting source building and required level
    let sourceInfo = {};
    if (pageId === 1511) {
      sourceInfo = ironArmorSourceInfo[iTab];
    } else {
      const craftingSources = $tab.find('h3 + p')
        .html().split('<br>')
        .filter(line => line.includes(' level: '));

      craftingSources.forEach(line => {
        const text = $(`<p>${line}</p>`).text();

        const matches = text.match(/(?<source>[a-zA-Z ]+) level: (?<craftingLevel>[0-9]+)( \((?<list>[a-zA-Z/ ]+)\))?/);
        if (!matches) return;
        const grps = matches.groups;

        let types = armorTypes;

        if (grps.list && grps.list !== 'currently unobtainable') {
          types = grps.list.split('/').filter((type) => {
            return armorTypes.includes(type);
          });
        }

        types.forEach((type) => {
          sourceInfo[type] = {
            source: [grps.source],
            craftingLevel: parseInt(grps.craftingLevel),
          };
        });
      });
    }


    // Parse table into items, with crafting materials required
    const quality = {};
    $tab.find('table tr:has(> td)').each((i, el) => {
      const $cells = $(el).find('td');
      const title = $cells.first().text().trim();
      if (title === 'Full set') return;

      const materials = $($cells.get(2)).html().split('<br>')
        .map((line) => {
          const normalizedMaterialText = $(line)
            .text().trim()
            .replace(/^([0-9]+) ?(\([0-9]+\))? ?(.+)/, '$1 x $3');
          return parseMaterialText(normalizedMaterialText);
        });

      let armorType = armorTypes[i];
      if (title.substr(0, 4) === 'Rag ') {
        // Rag armor doesn't have helmet, row 0 is type 1
        armorType = armorTypes[i + 1];
      }

      const sourceAndCraftingLevel = sourceInfo[armorType] || {};

      if (!items[title]) {
        items[title] = {
          title,
          pageId,
          categories,
          upgrades: [],
          qualityLevels: [],
          source: sourceAndCraftingLevel.source,
        };
      }

      items[title].qualityLevels.push({
        qualityLevel: iTab + 1,
        materials: materials.filter(({ quantity }) => quantity > 0),
        craftingAmount: 1,
        ...sourceAndCraftingLevel,
      });
    });

    return quality;
  });

  return Object.values(items);
};
