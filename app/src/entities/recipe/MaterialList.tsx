import { getEntityName, isEntityCraftable } from '@/data';
import { EntityContextProvider, useEntityContext } from '@/entities/entity/provider';
import AmountControl from '@/entities/recipe/AmountControl';
import { RecipeContextProvider } from '@/entities/recipe/provider';
import KeyValueList from '@/shared/ui/KeyValueList';
import { orderBy } from 'lodash-es';

interface ListItemProps {
  entity: EntityId,
  amount: number,
}

const NonCraftableItem = () => {
  return (
    <div className="entity-list-item">
      <EntityName />
    </div>
  );
};

const EntityName = () => {
  const { name } = useEntityContext();
  return (<span>{ name }</span>);
};

const CraftableItem = () => {
  return (
    <RecipeContextProvider quality={1}>
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
      <EntityContextProvider entity={entity}>
        { craftable ? <CraftableItem /> : <NonCraftableItem /> }
      </EntityContextProvider>
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
