import { Table as JoyTable } from '@mui/joy';
import TableRow from './TableRow';

interface Props {
  list: IItemRecipeAtom[],
}

const Table = ({ list }: Props) => {
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
        {list.map((item) => {
          return (<TableRow key={`${item.id}`} item={item} />);
        })}
      </tbody>
    </JoyTable>
  );
};

export default Table;
