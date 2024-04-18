import { useAtomValue } from 'jotai';
import { sortBy } from 'lodash-es';
import { useMemo } from 'react';
import { queryTypeAtom, readQueryTxtAtom, readWriteRecipesAtom } from '../atoms/recipes';
import { filterList } from '../helpers/filter';

const useFilterList = () => {
  const queryTxt = useAtomValue(readQueryTxtAtom);
  const queryType = useAtomValue(queryTypeAtom);

  const list = useAtomValue(readWriteRecipesAtom);

  const filteredList = useMemo(() => {
    const filtered = filterList(list, {
      key: queryType,
      value: queryTxt,
    });

    return sortBy(filtered, ['title', 'qualityLevel']);
  }, [queryTxt, queryType, list]);

  return [filteredList, queryTxt] as const;
};

export { useFilterList };
