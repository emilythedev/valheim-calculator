import { intersection } from 'lodash-es';

const filterPredicate = ({ title, pageId, source, internalId, qualityLevels }) => {
  if (source && intersection(source, ['Commands', 'n/a', 'Hildir', 'Haldor']).length > 0) {
    console.log('[SKIPPED]', JSON.stringify({title, pageId, reason: 'source'}));
    return false;
  }
  if (!source && !internalId) {
    console.log('[SKIPPED]', JSON.stringify({title, pageId, reason: 'source, internal ID'}));
    return false;
  }
  if (qualityLevels.length === 0) {
    console.log('[SKIPPED]', JSON.stringify({title, pageId, reason: 'qualityLevels'}));
    return false;
  }
  return true;
};

const breakdownQualityLevels = ({ qualityLevels, ...item }) => {
  const len = qualityLevels.length;

  return qualityLevels.map(({ qualityLevel, craftingLevel, materials, craftingAmount, source }) => {
    return {
      ...item,
      source: source || item.source,
      qualityLevel,
      craftingLevel,
      craftingAmount,
      materials,
      maxQuality: len,
    };
  });
};

export const transform = (list) => {
  const outputList = [];
  const len = list.length;

  for (let i = 0; i < len; i++) {
    const item = list[i];

    // remove non-craftable items
    if (!filterPredicate(item)) continue;

    breakdownQualityLevels(item).forEach((item) => {
      outputList.push(item);
    });
  }

  return outputList;
};

export const appendItemId = (list, searchIdByTitleAndQuality) => {
  return list.map(({upgrades, materials, source, ...item}) => {
    upgrades = upgrades.map(title => {
      return {
        id: searchIdByTitleAndQuality(title, null),
        title,
      };
    });

    source = !source ? null : source.map(title => {
      return {
        id: searchIdByTitleAndQuality(title, null),
        title,
      };
    });

    materials = materials.map(({ title, quantity }) => {
      return {
        id: searchIdByTitleAndQuality(title, null),
        title,
        quantity,
      };
    });

    return {
      id: searchIdByTitleAndQuality(item.title, item.qualityLevel),
      ...item,
      upgrades,
      source,
      materials,
    };
  });
};
