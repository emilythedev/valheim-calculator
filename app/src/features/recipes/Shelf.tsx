import AmountControl from '@/entities/recipe/AmountControl';
import RecipeListItem from '@/entities/recipe/RecipeListItem';
import { readRecipesAtom } from '@/shared/atoms';
import { useOpenDialog } from '@/shared/hooks';
import { Section } from '@/shared/ui/section';
import { useAtomValue } from 'jotai';

const ShelfItem = ({recipe}: {recipe: RecipeKey}) => {
  const openDialog = useOpenDialog(recipe);

  return (
    <RecipeListItem
      entity={recipe.entity}
      quality={recipe.quality}
      onViewRecipe={openDialog}
    >
      <AmountControl />
    </RecipeListItem>
  );
};

const Shelf = () => {
  const recipes = useAtomValue(readRecipesAtom);

  return (
    <>
      <Section id="Shelf">
        <h2 className="py-2 text-lg font-semibold">Shelf ({recipes.length})</h2>
        <div role="list" className="text-sm space-y-4">
          {recipes.map((recipeKey, i) => (
            <ShelfItem key={i} recipe={recipeKey} />
          ))}
        </div>
      </Section>
    </>
  );
};

export default Shelf;
