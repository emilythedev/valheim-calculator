import { readWriteRecipesAtom, readWriteSearchTxtAtom } from '@/entities/item/atoms/recipes';
import LazyLoadSheet, { LazyLoadSheetHandle } from '@/shared/ui/LazyLoadSheet';
import { useAtomValue } from 'jotai';
import { filter } from 'lodash-es';
import { useEffect, useMemo, useRef, useState } from 'react';
import Table from './Table';

const CHUNK_SIZE = 30;

const FilteredList = () => {
  const scrollableRef = useRef<LazyLoadSheetHandle>(null);
  const searchTxt = useAtomValue(readWriteSearchTxtAtom).trim().toLowerCase();
  const [lastIndex, setLastIndex] = useState(CHUNK_SIZE);

  const list = useAtomValue(readWriteRecipesAtom);
  const filteredList = useMemo(() => {
    if (!searchTxt) return list;

    return filter(list, ({ titleLower }) => {
      return titleLower.includes(searchTxt);
    });
  }, [searchTxt, list]);

  const displayList = filteredList.slice(0, lastIndex);

  useEffect(() => {
    setLastIndex(CHUNK_SIZE);
    scrollableRef.current?.scrollToTop();
  }, [searchTxt])

  return (
    <LazyLoadSheet
      ref={scrollableRef}
      sx={{ flexGrow: 1 }}
      onBottomReached={() => {
        if (filteredList.length > lastIndex) {
          setLastIndex(i => i + CHUNK_SIZE);
        }
      }}
    >
      <Table list={displayList} />
    </LazyLoadSheet>
  );
};

export default FilteredList;
