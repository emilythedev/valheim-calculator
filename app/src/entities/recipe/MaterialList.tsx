import { getEntityName } from '@/data';
import { Section, SectionHeader } from '@/shared/ui/section';
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

const MaterialList = ({ materials }: { materials: RecipeMaterials }) => {
  const pairs = orderBy(toPairs(materials), ['1'], ['desc']);

  return (
    <Section>
      <SectionHeader>Materials</SectionHeader>
      <div className="text-sm grid gap-2" style={{ gridTemplateColumns: 'max-content 1fr' }}>
        {pairs.map(([entity, amount]) => {
          return (<ListItem key={entity} entity={entity} amount={amount} />);
        })}
      </div>
    </Section>
  );
};

export default MaterialList;
