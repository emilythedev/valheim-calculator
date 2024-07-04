import RecipeDetails from '@/entities/recipe/RecipeDetails';
import RecipeListItem from '@/entities/recipe/RecipeListItem';
import { readRecipesAtom, recipeAmountAtoms } from '@/shared/atoms';
import NumberStepper from '@/shared/ui/NumberStepper';
import { Dialog } from '@/shared/ui/dialog';
import { Section } from '@/shared/ui/section';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';

const dialogOpenAtom = atom(false);
const recipeKeyAtom = atom<RecipeKey | null>(null);

const RecipeDetailsDialog = () => {
  const [open, setOpen] = useAtom(dialogOpenAtom);
  const recipe = useAtomValue(recipeKeyAtom);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <RecipeDetails recipe={recipe} />
    </Dialog>
  );
};

const RecipeAmountStepper = ({recipe}: {recipe: RecipeKey}) => {
  const [amount, setAmount] = useAtom(recipeAmountAtoms(recipe));

  return (
    <NumberStepper value={amount} onChange={setAmount} />
  );
};

const ShelfItem = ({recipe}: {recipe: RecipeKey}) => {
  const setOpen = useSetAtom(dialogOpenAtom);
  const setRecipeKey = useSetAtom(recipeKeyAtom);

  const handleClick = () => {
    setRecipeKey(recipe);
    setOpen(true);
  };

  return (
    <RecipeListItem
      entity={recipe.entity}
      quality={recipe.quality}
      onViewRecipe={handleClick}
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
      <RecipeDetailsDialog />
    </>
  );
};

export default Shelf;
