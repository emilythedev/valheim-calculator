import { Button } from '@mui/joy';
import { useAtom } from 'jotai';
import MaterialText from './MaterialText';
import StepperInput from './StepperInput';
import { wishListItemAmountAtomFamily } from './shared/atoms';

interface Prop {
  item: ItemAtomType,
}

const ItemRow = ({item}: Prop) => {
  const [amount, setAmount] = useAtom(wishListItemAmountAtomFamily(item.id));

  let title = item.title;
  if (item.maxQuality > 1) {
    title += ` [${item.qualityLevel}]`;
  }

  let sourceLvTxt = '';
  if (item.craftingLevel) {
    sourceLvTxt = ` [${item.craftingLevel}]`;
  }
  return (
    <tr>
      <td>{ title }</td>
      <td>
        {amount > 0 ? (
          <StepperInput
            value={amount}
            onChange={(value) => setAmount(value, item)}
          />
        ) : (
          <Button onClick={() => setAmount(1, item)}>Add</Button>
        )}
      </td>
      <td>
        {item.upgrades &&
          <ul>
            {item.upgrades.map((upgrade) => {
              return (<li key={upgrade.id}><MaterialText material={upgrade} /></li>);
            })}
          </ul>
        }
      </td>
    </tr>
  );
};

export default ItemRow;
