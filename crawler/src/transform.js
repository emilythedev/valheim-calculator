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

const breakdownLevels = ({ levels, upgrades, ...item }, getItemIdFn) => {
  const len = levels.length;

  upgrades = upgrades.map((title) => {
    return {
      id: getItemIdFn(title),
      title,
    }
  });

  return levels.map(({ level, craftingLevel, materials }) => {
    return {
      ...item,
      id: getItemIdFn(item.title, level),
      source: item.source ? {
        id: getItemIdFn(item.source),
        title: item.source,
      } : null,
      upgrades,
      itemLevel: level,
      craftingLevel,
      materials: transformMaterials(materials, getItemIdFn),
      maxLevel: len,
    };
  });
};

export const transform = (list, getItemIdFn) => {
  const outputList = [];
  const len = list.length;

  for (let i = 0; i < len; i++) {
    const item = list[i];

    // remove non-craftable items
    if (!filterPredicate(item)) continue;

    breakdownLevels(item, getItemIdFn).forEach((item) => {
      outputList.push(item);
    });
  }

  return outputList;
};
