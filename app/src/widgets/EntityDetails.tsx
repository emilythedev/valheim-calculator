import { getEntityMaxQuality, getExtensions } from '@/data';
import EntityName from '@/entities/entity/EntityName';
import { EntityContextProvider, useEntityContext } from '@/entities/entity/provider';
import AmountControl from '@/entities/recipe/AmountControl';
import { RecipeContextProvider, useRecipeContext } from '@/entities/recipe/provider';
import Quality from '@/entities/recipe/Quality';
import RecipeListItem from '@/entities/recipe/RecipeListItem';


export const QualityButton = () => {
  const { quality } = useRecipeContext();
  return (
    <div className="entity-list-item bg-secondary text-secondary-foreground justify-between">
      <Quality value={quality} className="text-base px-4" />
      <AmountControl />
    </div>
  );
};

interface EntityDetailsProps {
  entity: EntityId,
}

const QualityList = () => {
  const { entity, extendable } = useEntityContext();
  if (extendable) return null;

  const maxQuality = getEntityMaxQuality(entity);
  const children = [];
  for (let i = 0; i < maxQuality; i++) {
    children.push((
      <RecipeContextProvider key={i} quality={i + 1}>
        <QualityButton />
      </RecipeContextProvider>
    ));
  }

  return (
    <>
      <div className="text-base font-medium leading-none px-2 py-3">Quality</div>
      <div className="grid grid-cols-4 gap-6">
        {children}
      </div>
    </>
  );
};

const CraftingStation = () => {
  const { entity, extendable } = useEntityContext();
  if (!extendable) return null;

  const extensions = getExtensions(entity);

  return (
    <>
      <div className="text-base font-medium leading-none px-2 py-3">Base Building</div>
      <div className="grid grid-cols-4 gap-6">
        <RecipeContextProvider quality={1}>
          <QualityButton />
        </RecipeContextProvider>
      </div>
      <div className="text-base font-medium leading-none px-2 py-3">Extensions</div>
      <div className="grid grid-cols-4 gap-6">
        {extensions.map((extension) => (
          <RecipeListItem
            key={extension}
            entity={extension}
            hideRecipeButton
          >
            <AmountControl />
          </RecipeListItem>
        ))}
      </div>
    </>
  );
};

const EntityDetails = ({ entity }: EntityDetailsProps) => {
  if (!entity) return null;

  return (
    <div className="space-y-4">
      <EntityContextProvider entity={entity}>
        <h2 className="py-2 text-lg font-semibold"><EntityName /></h2>
        <div className="grid gap-x-12 gap-y-4 grid-cols-form items-baseline">
          <QualityList />
          <CraftingStation />
        </div>
      </EntityContextProvider>
    </div>
  )
};

export default EntityDetails;
