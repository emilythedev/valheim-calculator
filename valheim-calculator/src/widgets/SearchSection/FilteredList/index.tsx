import { writeLazyLoadMore } from '@/entities/item/atoms/recipes';
import LazyLoadSheet from '@/shared/ui/LazyLoadSheet';
import { useSetAtom } from 'jotai';
import Table from './Table';

const FilteredList = () => {
  const loadMore = useSetAtom(writeLazyLoadMore);

  return (
    <LazyLoadSheet
      sx={{ flexGrow: 1 }}
      onBottomReached={loadMore}
    >
      <Table />
    </LazyLoadSheet>
  );
};

export default FilteredList;
