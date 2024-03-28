import TitleText from '@/entities/item/ui/TitleText';
import AmountInput from '@/features/item/AmountInput';
import MaterialText from '@/features/material/MaterialText';

interface Prop {
  item: IItemRecipeAtom,
}

const TableRow = ({item}: Prop) => {
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
      <td><TitleText item={item} /></td>
      <td>
        <AmountInput item={item} />
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

export default TableRow;
