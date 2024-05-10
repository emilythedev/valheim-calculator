import { materialSummaryAtom } from '@/entities/item/atoms/wishlist';
import { Table, Typography } from '@mui/joy';
import { useAtomValue } from 'jotai';

const SummaryPanel = () => {
  const materialList = useAtomValue(materialSummaryAtom);

  return (
    <Table
      data-testid="cy-table-summary"
      variant="plain"
      stickyHeader
      hoverRow={materialList.length > 0}
    >
      <thead>
        <tr>
          <th>Title</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        { materialList.length > 0 ?
          materialList.map((item) => {
            return (
              <tr key={`summary_material_${item.title}`}>
                <td>{item.title}</td>
                <td>x{item.quantity}</td>
              </tr>
            );
          }) : (
            <tr>
              <td colSpan={2}>
                <Typography textAlign="center">Add item to wishlist to get a summary of crafting materials.</Typography>
              </td>
            </tr>
          )
        }
      </tbody>
    </Table>
  );
};

export default SummaryPanel;
