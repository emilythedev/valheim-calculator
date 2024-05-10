import { Table as JoyTable, Typography } from '@mui/joy';
import TableRow from './TableRow';

interface Props {
  list: IItemRecipeAtom[],
}

const Table = ({ list }: Props) => {
  return (
    <JoyTable
      data-testid="cy-table-recipes"
      variant="plain"
      stickyHeader
      hoverRow={list.length > 0}
    >
      <thead>
        <tr>
          <th colSpan={3}>Item [Quality Lv.]</th>
        </tr>
      </thead>
      <tbody>
        { list.length > 0 ?
          list.map((item) => {
            return (<TableRow key={`${item.id}`} item={item} />);
          }) : (
            <tr>
              <td colSpan={3}>
                <Typography textAlign={'center'}>No data found.</Typography>
              </td>
            </tr>
          )
        }
      </tbody>
    </JoyTable>
  );
};

export default Table;
