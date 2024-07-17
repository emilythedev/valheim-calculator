import { useRecipeContext } from '@/entities/recipe/provider';
import RecipeListItem from '@/entities/recipe/RecipeListItem';
import { readRecipesAtom } from '@/shared/atoms';
import { useOpenDialog } from '@/shared/hooks';
import NumberStepper from '@/shared/ui/NumberStepper';
import { Section } from '@/shared/ui/section';
import { useAtomValue } from 'jotai';

const RecipeAmountStepper = () => {
  const { amount, setAmount } = useRecipeContext();

  return (
    <NumberStepper value={amount} onChange={setAmount} />
  );
};

const ShelfItem = ({recipe}: {recipe: RecipeKey}) => {
  const openDialog = useOpenDialog(recipe);

  return (
    <RecipeListItem
      entity={recipe.entity}
      quality={recipe.quality}
      onViewRecipe={openDialog}
    >
      <RecipeAmountStepper />
    </RecipeListItem>
  );
};

const Shelf = () => {
  const recipes = useAtomValue(readRecipesAtom);

  return (
    <>
      <Section>
        <h2 className="py-2 text-lg font-semibold">Shelf</h2>
        <div className="text-sm space-y-4">
          {recipes.map((recipeKey, i) => (
            <ShelfItem key={i} recipe={recipeKey} />
          ))}
        </div>
      </Section>
    </>
  );
};

export default Shelf;
