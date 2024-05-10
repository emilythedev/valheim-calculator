import { useFilterList } from '@/entities/item/hooks/filter';
import LazyLoadSheet, { LazyLoadSheetHandle } from '@/shared/ui/LazyLoadSheet';
import { useEffect, useRef, useState } from 'react';
import Table from './Table';

const CHUNK_SIZE = 30;

const FilteredList = () => {
  const scrollableRef = useRef<LazyLoadSheetHandle>(null);
  const [lastIndex, setLastIndex] = useState(CHUNK_SIZE);
  const [filteredList, filterOptions] = useFilterList();

  const displayList = filteredList.slice(0, lastIndex);

  useEffect(() => {
    setLastIndex(CHUNK_SIZE);
    scrollableRef.current?.scrollToTop();
  }, [filterOptions]);

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
