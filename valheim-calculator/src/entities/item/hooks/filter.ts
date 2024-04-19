import { useAtomValue } from 'jotai';
import { sortBy } from 'lodash-es';
import { useMemo } from 'react';
import { readFilterOptionsAtom, readWriteRecipesAtom } from '../atoms/recipes';
import { filterList } from '../helpers/filter';

const useFilterList = () => {
  const options = useAtomValue(readFilterOptionsAtom);

  const list = useAtomValue(readWriteRecipesAtom);

  const filteredList = useMemo(() => {
    const filtered = filterList(list, options);

    return sortBy(filtered, ['title', 'qualityLevel']);
  }, [options, list]);

  return [filteredList, options] as const;
};

export { useFilterList };
