import { getEntityName } from '@/data';
import KeyValueList from '@/shared/ui/KeyValueList';
import { orderBy } from 'lodash-es';

interface ListItemProps {
  entity: EntityId,
  amount: number,
}

const ListItem = ({ entity, amount }: ListItemProps) => {
  const name = getEntityName(entity);

  return (
    <>
      <div className="text-center px-2 py-1">{ amount }</div>
      <div className="px-2 py-1">{ name }</div>
    </>
  );
};

const sort = (pairs: [string, number][]) => {
  return orderBy(pairs, ([entity]) => getEntityName(entity), 'asc');
}

const MaterialList = ({ materials }: { materials: RecipeMaterials }) => {
  return (
    <KeyValueList
      list={materials}
      className="text-sm grid gap-2"
      style={{ gridTemplateColumns: 'max-content 1fr' }}
      item={(entity, amount: number) => (
        <ListItem key={entity} entity={entity} amount={amount} />
      )}
      sort={sort}
    />
  );
};

export default MaterialList;
