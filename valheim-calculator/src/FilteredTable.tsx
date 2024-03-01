import { Table } from '@mui/joy';
import { useAtomValue } from 'jotai';
import ItemRow from './ItemRow';
import { filteredListAtom } from './shared/atoms';

const FilteredTable = () => {
  const list = useAtomValue(filteredListAtom);

  return (
    <Table variant="plain" stickyHeader hoverRow>
      <thead>
        <tr>
          <th>Title</th>
          <th>Source</th>
          <th>Upgrades</th>
          <th>Materials</th>
        </tr>
      </thead>
      <tbody>
        {list.map((item: ItemType) => {
          return (<ItemRow key={`${item.title}_${item.itemLevel}`} item={item} />);
        })}
      </tbody>
    </Table>
  );
};

export default FilteredTable;
