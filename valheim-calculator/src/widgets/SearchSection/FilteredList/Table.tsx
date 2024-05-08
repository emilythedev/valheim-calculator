import { Table as JoyTable } from '@mui/joy';
import TableRow from './TableRow';

interface Props {
  list: IItemRecipeAtom[],
}

const Table = ({ list }: Props) => {
  return (
    <JoyTable variant="plain" stickyHeader hoverRow data-testid="cy-table-recipes">
      <thead>
        <tr>
          <th colSpan={3}>Item [Quality Lv.]</th>
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
