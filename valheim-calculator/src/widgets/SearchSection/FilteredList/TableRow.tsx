import { writeSearchUpgradesByNameAtom } from '@/entities/item/atoms/recipes';
import TitleText from '@/entities/item/ui/TitleText';
import AmountInput from '@/features/item/AmountInput';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/joy';
import { useSetAtom } from 'jotai';

interface Prop {
  item: IItemRecipeAtom,
}

const TableRow = ({item}: Prop) => {
  const searchUpgrades = useSetAtom(writeSearchUpgradesByNameAtom);

  return (
    <tr>
      <td><TitleText item={item} /></td>
      <td>
        {item.upgrades.length > 0 &&
          <Button
            variant="outlined"
            startDecorator={<SearchIcon />}
            onClick={() => searchUpgrades(item.title)}
          >View Upgrades</Button>
        }
      </td>
      <td style={{ textAlign: 'right' }}><AmountInput item={item} /></td>
    </tr>
  );
};

export default TableRow;
