const filterPredicate = ({ title, pageId, source, internalId, levels }) => {
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
  if (levels.length === 0) {
    console.log('[SKIPPED]', JSON.stringify({title, pageId, reason: 'levels'}));
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

const breakdownLevels = ({ levels, upgrades, ...item }) => {
  const len = levels.length;

  return levels.map(({ level, craftingLevel, materials, craftingAmount }) => {
    return {
      ...item,
      upgrades,
      itemLevel: level,
      craftingLevel,
      craftingAmount,
      materials,
      maxLevel: len,
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

    breakdownLevels(item).forEach((item) => {
      outputList.push(item);
    });
  }

  return outputList;
};
