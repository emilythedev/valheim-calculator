import { getEntityMaxQuality, getExtensions } from '@/data';
import EntityName from '@/entities/entity/EntityName';
import { EntityContextProvider, useEntityContext } from '@/entities/entity/provider';
import AmountControl from '@/entities/recipe/AmountControl';
import { RecipeContextProvider, useRecipeContext } from '@/entities/recipe/provider';
import Quality from '@/entities/recipe/Quality';
import RecipeListItem from '@/entities/recipe/RecipeListItem';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { X } from 'lucide-react';

export const QualityButton = () => {
  const { quality } = useRecipeContext();
  return (
    <div className="entity-list-item bg-secondary text-secondary-foreground justify-between">
      <Quality value={quality} className="text-base px-4" />
      <AmountControl />
    </div>
  );
};

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
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-4">
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
      <div className="grid grid-cols-1 gap-6">
        <RecipeContextProvider quality={1}>
          <QualityButton />
        </RecipeContextProvider>
      </div>
      <div className="text-base font-medium leading-none px-2 py-3">Extensions</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
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

interface EntityDetailsProps {
  entity: EntityId,
  onClear?: () => void,
}

const EntityDetails = ({ entity, onClear }: EntityDetailsProps) => {
  if (!entity) return null;

  return (
    <Card className="relative">
      <Button
        size="icon"
        variant="ghost"
        className="absolute right-4 top-4"
        onClick={() => onClear && onClear()}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Clear selected entity</span>
      </Button>
      <EntityContextProvider entity={entity}>
        <CardHeader>
          <CardTitle><EntityName /></CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-x-12 gap-y-6 grid-cols-form items-baseline max-md:grid-cols-1 max-md:gap-y-4">
            <QualityList />
            <CraftingStation />
          </div>
        </CardContent>
      </EntityContextProvider>
    </Card>
  )
};

export default EntityDetails;
