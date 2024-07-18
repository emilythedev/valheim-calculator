import { getEntityMaxQuality, getEntityName, getExtensions, isExtendable } from '@/data';
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

export interface EntityDetailsProps {
  entity: EntityId,
}

const QualityList = ({ entity }: EntityDetailsProps) => {
  const maxQuality = getEntityMaxQuality(entity);
  const children = [];
  for (let i = 0; i < maxQuality; i++) {
    children.push((
      <RecipeContextProvider key={i} entity={entity} quality={i + 1}>
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

const CraftingStation = ({ entity }: EntityDetailsProps) => {
  const extensions = getExtensions(entity);

  return (
    <>
      <div className="text-base font-medium leading-none px-2 py-3">Base Building</div>
      <div className="grid grid-cols-4 gap-6">
        <RecipeContextProvider entity={entity} quality={1}>
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
  const name = getEntityName(entity);
  const extendable = isExtendable(entity);

  return (
    <div className="space-y-4">
      <h2 className="py-2 text-lg font-semibold">{ name }</h2>
      <div className="grid gap-x-12 gap-y-4 grid-cols-form items-baseline">
        { !extendable ? <QualityList entity={entity} /> : <CraftingStation entity={entity} /> }
      </div>
    </div>
  )
};

export default EntityDetails;
