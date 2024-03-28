import { filteredListAtom, readLazyLoadIndex, writeLazyLoadMore } from '@/entities/item/atoms/recipes';
import LazyLoadSheet from '@/shared/ui/LazyLoadSheet';
import { Table } from '@mui/joy';
import { useAtomValue, useSetAtom } from 'jotai';
import ItemRow from './ItemRow';

const FilteredTable = () => {
  const list = useAtomValue(filteredListAtom);
  const lastIndex = useAtomValue(readLazyLoadIndex);
  const loadMore = useSetAtom(writeLazyLoadMore);

  return (
    <LazyLoadSheet
      sx={{ flexGrow: 1 }}
      onBottomReached={loadMore}
    >
      <Table variant="plain" stickyHeader hoverRow>
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Upgrades</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, i) => {
            if (i < lastIndex) {
              return (<ItemRow key={`${item.id}`} item={item} />);
            } else return null
          })}
        </tbody>
      </Table>
    </LazyLoadSheet>
  );
};

export default FilteredTable;
