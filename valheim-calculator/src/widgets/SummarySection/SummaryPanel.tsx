import { materialSummaryAtom } from '@/entities/item/atoms/wishlist';
import { Table } from '@mui/joy';
import { useAtomValue } from 'jotai';

const SummaryPanel = () => {
  const materialList = useAtomValue(materialSummaryAtom);

  return (
    <Table data-testid="cy-table-summary" variant="plain" stickyHeader hoverRow>
      <thead>
        <tr>
          <th>Title</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {materialList.map((item) => {
          return (
            <tr key={`summary_material_${item.title}`}>
              <td>{item.title}</td>
              <td>x{item.quantity}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  )
};

export default SummaryPanel;
