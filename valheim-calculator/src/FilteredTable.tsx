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
          <th>Amount</th>
          <th>Upgrades</th>
        </tr>
      </thead>
      <tbody>
        {list.map((item) => {
          return (<ItemRow key={`${item.id}`} item={item} />);
        })}
      </tbody>
    </Table>
  );
};

export default FilteredTable;
