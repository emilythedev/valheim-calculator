import { searchTxtAtom } from '@/entities/item/atoms/recipes';
import TitleText from '@/entities/item/ui/TitleText';
import AmountInput from '@/features/item/AmountInput';
import { Button } from '@mui/joy';
import { useSetAtom } from 'jotai';
import { map } from 'lodash-es';

interface Prop {
  item: IItemRecipeAtom,
}

const TableRow = ({item}: Prop) => {
  const setSearchTxt = useSetAtom(searchTxtAtom);

  return (
    <tr>
      <td><TitleText item={item} /></td>
      <td>
        {item.upgrades.length > 0 &&
          <Button
            onClick={() => setSearchTxt(`id:${map(item.upgrades, 'id').join(',')}`)}
          >View Upgrades</Button>
        }
      </td>
      <td style={{ textAlign: 'right' }}><AmountInput item={item} /></td>
    </tr>
  );
};

export default TableRow;
