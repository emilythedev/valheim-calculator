import { writeQueryFormAtom } from '@/entities/item/atoms/recipes';
import TitleText from '@/entities/item/ui/TitleText';
import AmountInput from '@/features/item/AmountInput';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/joy';
import { useSetAtom } from 'jotai';

interface Prop {
  item: IItemRecipeAtom,
}

const TableRow = ({item}: Prop) => {
  const setQueryForm = useSetAtom(writeQueryFormAtom);

  const hasUpgrades = item.upgrades.length > 0;

  return (
    <>
      <td colSpan={hasUpgrades ? undefined : 2}><TitleText item={item} /></td>
      {hasUpgrades && (
        <td>
          <Button
            data-testid="cy-btn-viewUpgrades"
            variant="outlined"
            startDecorator={<SearchIcon />}
            onClick={() => setQueryForm({
              key: 'id',
              value: item.upgrades.map(i => i.id).filter(i => !!i) as number[],
              inputText: item.title,
              selectValue: 'upgrades',
            })}
          >View Upgrades</Button>
        </td>
      )}
      <td style={{ textAlign: 'right' }}><AmountInput item={item} /></td>
    </>
  );
};

export default TableRow;
