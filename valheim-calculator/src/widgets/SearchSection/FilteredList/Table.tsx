import { filteredListAtom, readLazyLoadIndex } from '@/entities/item/atoms/recipes';
import { Table as JoyTable } from '@mui/joy';
import { useAtomValue } from 'jotai';
import TableRow from './TableRow';

const Table = () => {
  const list = useAtomValue(filteredListAtom);
  const lastIndex = useAtomValue(readLazyLoadIndex);

  const displayList = list.slice(0, lastIndex);

  return (
    <JoyTable variant="plain" stickyHeader hoverRow>
      <thead>
        <tr>
          <th>Title</th>
          <th>Amount</th>
          <th>Upgrades</th>
        </tr>
      </thead>
      <tbody>
        {displayList.map((item) => {
          return (<TableRow key={`${item.id}`} item={item} />);
        })}
      </tbody>
    </JoyTable>
  );
};

export default Table;
