const filterPredicate = ({ title, pageId, source, internalId, qualityLevels }) => {
  if (source && (
    source === 'n/a' ||
    source.indexOf('Commands') !== -1 ||
    source === 'Hildir'
  )) {
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

const transformMaterials = (materials, getItemIdFn) => {
  return materials.map(({title, quantity}) => {
    return {
      id: getItemIdFn(title),
      title,
      quantity,
    }
  });
};

const breakdownQualityLevels = ({ qualityLevels, upgrades, ...item }) => {
  const len = qualityLevels.length;

  return qualityLevels.map(({ qualityLevel, craftingLevel, materials, craftingAmount }) => {
    return {
      ...item,
      upgrades,
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
