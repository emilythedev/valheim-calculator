import { Input } from '@mui/joy';
import { useAtom } from 'jotai';
import MaterialText from './MaterialText';
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
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value), item)}
        />
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
