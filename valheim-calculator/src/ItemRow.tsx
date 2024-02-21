
interface MaterialObjType {
  title: string,
  quantity: number,
}

type MaterialType = MaterialObjType | string;

interface ItemType {
  title: string,
  categories: string[],
  source: string,
  upgrades: string[],
  itemLevel: number,
  craftingLevel: number | null,
  materials: MaterialType[],
  maxLevel: number,
}

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
              return (<li key={upgrade}>{ upgrade }</li>);
            })}
          </ul>
        }
      </td>
      <td>
        <ul>
          {item.materials.map((material) => {
            if (typeof material === 'string') {
              return (<li key={material}>{ material }</li>);
            }
            return (<li key={material.title}>{material.quantity} {material.title}</li>);
          })}
        </ul>
      </td>
    </tr>
  )
}

export default ItemRow
