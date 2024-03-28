import { filter } from 'lodash-es';

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

    return filter(list, ({ id }) => {
      return queryValue.includes(id);
    });
  }

  return list;
};

export { filterList };
