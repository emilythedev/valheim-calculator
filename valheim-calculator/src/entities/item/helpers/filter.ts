import { filter, some } from 'lodash-es';

interface IQueryValueObject {
  value: string,
  fullMatch: boolean,
}

const filterList = (list: IItemRecipeAtom[], options: IQueryOptions): IItemRecipeAtom[] => {
  if (!options.value || options.value.length === 0) return list;

  if (options.key === 'id') {
    const queryValue = options.value as number[];

    return filter(list, ({ id }) => {
      return queryValue.includes(id);
    });
  }

  const queryValues: IQueryValueObject[] = (options.value as string).split(',').map(s => {
    s = s.trim();

    if (s.startsWith('"') && s.endsWith('"')) {
      return {
        value: s.slice(1, -1).trim(),
        fullMatch: true,
      };
    } else {
      return {
        value: s,
        fullMatch: false,
      };
    }
  });

  if (options.key === 'title') {
    return filter(list, ({ titleLower }) => {
      return some(queryValues, ({ value, fullMatch }) => {
        if (fullMatch) {
          return titleLower === value;
        } else {
          return titleLower.includes(value);
        }
      });
    });
  } else if (options.key === 'upgrades') {
    const ids = list.reduce<number[]>((acc, item) => {
      const { titleLower, upgrades } = item

      const matched = some(queryValues, ({ value, fullMatch }) => {
        if (fullMatch) {
          return titleLower === value;
        } else {
          return titleLower.includes(value);
        }
      });

      const upgradeIds = upgrades.map(i => i.id).filter(i => !!i) as number[];

      return !matched ? acc : acc.concat(upgradeIds);
    }, [] as number[]);

    return filterList(list, { key: 'id', value: ids })
  }

  return list;
};

export { filterList };
