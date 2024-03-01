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

  let sourceLvTxt = '';
  if (item.craftingLevel) {
    sourceLvTxt = ` [Lv${item.craftingLevel}]`;
  }
  return (
    <tr>
      <td>{ title }</td>
      <td>
        {item.source &&
          (<Typography><MaterialText material={item.source} />{sourceLvTxt}</Typography>)
        }
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
      <td>
        <ul>
          {item.materials.map((material) => {
            return (
              <li key={material.title}>
                <Typography>{material.quantity} <MaterialText material={material} /></Typography>
              </li>);
          })}
        </ul>
      </td>
    </tr>
  );
};

export default ItemRow;
