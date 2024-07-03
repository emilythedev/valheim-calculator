import { getEntityName } from '@/data';
import { orderBy, toPairs } from 'lodash-es';

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

const MaterialList = ({ materials, className }: { materials: RecipeMaterials, className?: string }) => {
  const pairs = orderBy(toPairs(materials), ['1'], ['desc']);

  return (
    <div className={`space-y-4 ${className || ''}`}>
      <h4 className="text-sm font-medium">Materials</h4>
      <div className="text-sm grid gap-2" style={{ gridTemplateColumns: 'max-content 1fr' }}>
        {pairs.map(([entity, amount]) => {
          return (<ListItem key={entity} entity={entity} amount={amount} />);
        })}
      </div>
    </div>
  );
};

export default MaterialList;
