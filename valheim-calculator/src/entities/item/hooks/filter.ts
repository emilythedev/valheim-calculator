import { useAtomValue } from 'jotai';
import { sortBy } from 'lodash-es';
import { useMemo } from 'react';
import { readQueryTxtAtom, readWriteRecipesAtom } from '../atoms/recipes';
import { filterList } from '../helpers/filter';

const useFilterList = () => {
  const searchTxt = useAtomValue(readQueryTxtAtom);

  const list = useAtomValue(readWriteRecipesAtom);

  const filteredList = useMemo(() => {
    let filtered = list;

    if (searchTxt.startsWith('id:')) {
      filtered = filterList(
        list,
        'id',
        searchTxt.slice(3).split(',')
          .map(s => parseInt(s))
          .filter(i => !isNaN(i))
      );
    } else {
      filtered = filterList(list, 'title', searchTxt);
    }

    return sortBy(list, ['title', 'qualityLevel']);
  }, [searchTxt, list]);

  return [filteredList, searchTxt] as const;
};

export { useFilterList };
