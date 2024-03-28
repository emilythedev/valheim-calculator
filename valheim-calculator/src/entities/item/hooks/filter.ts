import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { readQueryTxtAtom, readWriteRecipesAtom } from '../atoms/recipes';
import { filterList } from '../helpers/filter';

const useFilterList = () => {
  const searchTxt = useAtomValue(readQueryTxtAtom);

  const list = useAtomValue(readWriteRecipesAtom);

  const filteredList = useMemo(() => {
    return filterList(list, 'title', searchTxt);
  }, [searchTxt, list]);

  return [filteredList, searchTxt] as const;
};

export { useFilterList };
