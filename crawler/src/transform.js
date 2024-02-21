const filterPredicate = ({ title, source, internalId, levels }) => {
  if (source && (
    source === 'n/a' ||
    source.indexOf('Commands') !== -1 ||
    source === 'Hildir'
  )) {
    console.log(`[${title}] is skipped. (source)`);
    return false;
  }
  if (!source && !internalId) {
    console.log(`[${title}] is skipped. (source, internal ID)`);
    return false;
  }
  if (levels.length === 0) {
    console.log(`[${title}] is skipped. (levels)`);
    return false;
  }
  return true;
};

const breakdownLevels = ({ levels, ...item }) => {
  const len = levels.length;
  return levels.map(({ level, craftingLevel, materials }) => {
    return {
      ...item,
      itemLevel: level,
      craftingLevel,
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
