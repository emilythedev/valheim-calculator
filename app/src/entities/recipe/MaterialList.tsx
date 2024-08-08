import { getEntityName, isEntityCraftable } from '@/data';
import EntityName from '@/entities/entity/EntityName';
import { EntityContextProvider } from '@/entities/entity/provider';
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

const CraftableItem = () => {
  return (
    <RecipeContextProvider quality={1}>
      <div className="entity-list-item relative justify-between bg-secondary text-secondary-foreground flex-wrap">
        <EntityName className="max-sm:w-full" />
        <AmountControl />
      </div>
    </RecipeContextProvider>
  );
};

const ListItem = ({ entity, amount }: ListItemProps) => {
  const craftable = isEntityCraftable(entity);

  return (
    <div role="listitem" className="grid grid-cols-subgrid col-span-2 items-baseline">
      <div className="text-center px-2 py-2">{ amount }</div>
      <EntityContextProvider entity={entity}>
        { craftable ? <CraftableItem /> : <NonCraftableItem /> }
      </EntityContextProvider>
    </div>
  );
};

const sort = (pairs: [string, number][]) => {
  return orderBy(pairs, ([entity]) => getEntityName(entity), 'asc');
};

const MaterialList = ({ materials }: { materials: RecipeMaterials }) => {
  return (
    <KeyValueList
      list={materials}
      className="text-sm grid grid-cols-form gap-2 items-baseline"
      item={(entity, amount: number) => (
        <ListItem key={entity} entity={entity} amount={amount} />
      )}
      sort={sort}
    />
  );
};

export default MaterialList;
