import { getEntityName, isEntityCraftable } from '@/data';
import KeyValueList from '@/shared/ui/KeyValueList';
import { orderBy } from 'lodash-es';
import AmountControl from './AmountControl';
import { RecipeContextProvider, useRecipeContext } from './provider';

interface ListItemProps {
  entity: EntityId,
  amount: number,
}

const NonCraftableItem = ({ entity }: { entity: EntityId }) => {
  const name = getEntityName(entity);
  return (
    <div className="entity-list-item">
      <span>{ name }</span>
    </div>
  );
};

const EntityName = () => {
  const { name } = useRecipeContext();
  return (<span>{ name }</span>);
};

const CraftableItem = ({ entity }: { entity: EntityId }) => {
  return (
    <RecipeContextProvider entity={entity} quality={1}>
      <div className="entity-list-item justify-between bg-secondary text-secondary-foreground">
        <EntityName />
        <AmountControl />
      </div>
    </RecipeContextProvider>
  );
};

const ListItem = ({ entity, amount }: ListItemProps) => {
  const craftable = isEntityCraftable(entity);

  return (
    <>
      <div className="text-center px-2 py-2">{ amount }</div>
      { craftable ? <CraftableItem entity={entity} /> : <NonCraftableItem entity={entity} /> }
    </>
  );
};

const sort = (pairs: [string, number][]) => {
  return orderBy(pairs, ([entity]) => getEntityName(entity), 'asc');
};

const MaterialList = ({ materials }: { materials: RecipeMaterials }) => {
  return (
    <KeyValueList
      list={materials}
      className="text-sm grid grid-cols-form gap-2 items-center"
      item={(entity, amount: number) => (
        <ListItem key={entity} entity={entity} amount={amount} />
      )}
      sort={sort}
    />
  );
};

export default MaterialList;
