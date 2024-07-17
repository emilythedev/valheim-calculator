import { getEntity, getExtensions, getRecipe, isExtendable } from '@/data';
import KeyValueList from '@/shared/ui/KeyValueList';
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/shared/ui/dialog';
import { Section, SectionHeader } from '@/shared/ui/section';
import MaterialList from './MaterialList';
import Quality from './Quality';
import RecipeListItem from './RecipeListItem';
import ShelfStatusText from './ShelfStatusText';

const MaterialListSection = ({ materials }: { materials: RecipeMaterials }) => {
  return (
    <Section>
      <SectionHeader>Materials</SectionHeader>
      <MaterialList materials={materials} />
    </Section>
  );
};

const CraftStationListSection = ({ stations }: { stations: EntityQualityList | null }) => {
  if (!stations) return null;

  return (
    <Section>
      <SectionHeader>Required station</SectionHeader>
      <KeyValueList
        className="text-sm"
        list={stations}
        item={(entity, quality) => (
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

const ExtensionListSection = ({ entity }: { entity: EntityId }) => {
  if (!isExtendable(entity)) return null;

  const extensions = getExtensions(entity);

  return (
    <Section>
      <SectionHeader>Extensions</SectionHeader>
      <div className="space-y-4">
        {extensions.map((extension) => (
          <RecipeListItem
            key={extension}
            entity={extension}
            hideRecipeButton
          >
            <ShelfStatusText recipe={{ entity: extension, quality: 1 }} />
          </RecipeListItem>
        ))}
      </div>
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
            {entity.upgradable && <Quality value={recipe?.quality || 0} />}
          </div>
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4">
        <ExtensionListSection entity={recipeKey.entity} />
        <MaterialListSection materials={recipe.materials} />
        <CraftStationListSection stations={recipe.craftingStation} />
      </div>
    </DialogContent>
  );
};

export default RecipeDetails;
