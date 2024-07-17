import { getEntity, getExtensions, getRecipe, isExtendable } from '@/data';
import MaterialList from '@/entities/recipe/MaterialList';
import Quality from '@/entities/recipe/Quality';
import RecipeListItem from '@/entities/recipe/RecipeListItem';
import ShelfStatusText from '@/entities/recipe/ShelfStatusText';
import { dialogOpenAtom, dialogReadRecipeKeyAtom } from '@/shared/atoms';
import KeyValueList from '@/shared/ui/KeyValueList';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/shared/ui/dialog';
import { Section, SectionHeader } from '@/shared/ui/section';
import { useAtom, useAtomValue } from 'jotai';

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
          >
            <ShelfStatusText allowAdd />
          </RecipeListItem>
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
            <ShelfStatusText allowAdd />
          </RecipeListItem>
        ))}
      </div>
    </Section>
  );
};

interface RecipeDetailsProps {
  recipe: RecipeKey | null,
}

const RecipeDetails = ({ recipe: recipeKey }: RecipeDetailsProps) => {
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
      <div className="space-y-12">
        <ExtensionListSection entity={recipeKey.entity} />
        <MaterialListSection materials={recipe.materials} />
        <CraftStationListSection stations={recipe.craftingStation} />
      </div>
    </DialogContent>
  );
};

const RecipeDetailsDialog = () => {
  const [open, setOpen] = useAtom(dialogOpenAtom);
  const recipe = useAtomValue(dialogReadRecipeKeyAtom);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <RecipeDetails recipe={recipe} />
    </Dialog>
  );
};

export default RecipeDetailsDialog;
