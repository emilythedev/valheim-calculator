import { getEntity, getRecipe } from '@/data';
import KeyValueList from '@/shared/ui/KeyValueList';
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/shared/ui/dialog';
import { Section, SectionHeader } from '@/shared/ui/section';
import MaterialList from './MaterialList';
import Quality from './Quality';
import RecipeListItem from './RecipeListItem';

const CraftStationList = ({ stations }: { stations: EntityQualityList | null }) => {
  if (!stations) return null;

  return (
    <Section>
      <SectionHeader>Required station</SectionHeader>
      <KeyValueList
        className="text-sm"
        list={stations}
        item={(entity, quality: number | null) => (
          <RecipeListItem
            key={entity}
            entity={entity}
            quality={quality}
            hideRecipeButton
          />
        )}
      />
    </Section>
  );
};

interface Props {
  recipe: RecipeKey | null,
}

const RecipeDetails = ({ recipe: recipeKey }: Props) => {
  if (!recipeKey) return null;

  const entity = getEntity(recipeKey.entity);
  const recipe = getRecipe(recipeKey.entity, recipeKey.quality);

  if (!entity || !recipe) return null;

  return (
    <DialogContent>
      <DialogHeader className="space-y-4 mb-4">
        <DialogTitle>{ entity.name }</DialogTitle>
        <DialogDescription asChild>
          <div className="flex flex-row">
            <Quality value={recipe?.quality || 0} />
          </div>
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4">
        <MaterialList materials={recipe.materials} />
        <CraftStationList stations={recipe.craftingStation} />
      </div>
    </DialogContent>
  );
};

export default RecipeDetails;
