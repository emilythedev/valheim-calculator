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
  }

  return list;
};

export { filterList };
