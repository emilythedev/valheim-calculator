import { Typography } from '@mui/joy';
import MaterialText from './MaterialText';

interface Prop {
  item: ItemType,
}

const ItemRow = ({item}: Prop) => {
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
        {item.source &&
          (<Typography><MaterialText material={item.source[0]} />{sourceLvTxt}</Typography>)
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
