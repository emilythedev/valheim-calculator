import { filter, forEach } from 'lodash-es';

type QueryValue<K extends QueryKey> =
  K extends 'id' ? number[] :
  K extends 'title' ? string :
  never;

type QueryKey = 'id' | 'title';

const filterList = <K extends QueryKey>(list: IItemRecipeAtom[], queryKey: K, queryValue: QueryValue<K>) => {
  if (queryKey === 'title') {
    if (!queryValue) return list;

    return filter(list, ({ titleLower }) => {
      return titleLower.includes(queryValue as string);
    });
  } else if (queryKey === 'id') {
    const results: IItemRecipeAtom[] = [];

    // keep the ordering of input ids
    forEach(list, (item) => {
      const i = queryValue.indexOf(item.id);
      if (i > -1) {
        results[i] = item;
      }
    });

    // filter item not found
    return results.filter(item => !!item);
  }

  return list;
};

export { filterList };
