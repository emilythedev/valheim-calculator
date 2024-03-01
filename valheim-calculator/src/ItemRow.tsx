import { Typography } from '@mui/joy';
import MaterialText from './MaterialText';

interface Prop {
  item: ItemType,
}

const ItemRow = ({item}: Prop) => {
  let title = item.title;
  if (item.maxLevel > 1) {
    title += ` [Lv${item.itemLevel}]`;
  }

  let source = item.source;
  if (item.craftingLevel) {
    source += ` [Lv${item.craftingLevel}]`;
  }
  return (
    <tr>
      <td>{ title }</td>
      <td>{ source }</td>
      <td>
        {item.upgrades &&
          <ul>
            {item.upgrades.map((upgrade) => {
              return (<li key={upgrade}><MaterialText name={upgrade} /></li>);
            })}
          </ul>
        }
      </td>
      <td>
        <ul>
          {item.materials.map((material) => {
            if (typeof material === 'string') {
              return (<li key={material}><MaterialText name={material} /></li>);
            }
            return (
              <li key={material.title}>
                <Typography>{material.quantity} <MaterialText name={material.title} /></Typography>
              </li>);
          })}
        </ul>
      </td>
    </tr>
  )
}

export default ItemRow
