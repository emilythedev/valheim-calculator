import RecipeListItem from '@/entities/recipe/RecipeListItem';
import { readRecipesAtom, recipeAmountAtoms } from '@/shared/atoms';
import { useOpenDialog } from '@/shared/hooks';
import NumberStepper from '@/shared/ui/NumberStepper';
import { Section } from '@/shared/ui/section';
import { useAtom, useAtomValue } from 'jotai';

const RecipeAmountStepper = ({recipe}: {recipe: RecipeKey}) => {
  const [amount, setAmount] = useAtom(recipeAmountAtoms(recipe));

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
      <RecipeAmountStepper recipe={recipe} />
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
