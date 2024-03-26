import { Table } from '@mui/joy';
import { useAtomValue } from 'jotai';
import { totalMaterialsAtom } from './shared/atoms';

const SummaryPanel = () => {
  const materialList = useAtomValue(totalMaterialsAtom);

  return (
    <Table variant="plain" stickyHeader hoverRow>
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
