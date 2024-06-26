import Quality from '@/entities/recipe/Quality';
import { readRecipesAtom, recipeAmountAtoms } from '@/shared/atoms';
import NumberStepper from '@/shared/ui/NumberStepper';
import { useAtom, useAtomValue } from 'jotai';

const ShelfItem = (recipe: RecipeKey) => {
  const [amount, setAmount] = useAtom(recipeAmountAtoms(recipe));
  return (
    <div className="flex flex-row items-center gap-4">
      <div>{ recipe.entity }</div>
      <Quality value={recipe.quality} />
      <NumberStepper value={amount} onChange={setAmount} />
    </div>
  );
};

const Shelf = () => {
  const recipes = useAtomValue(readRecipesAtom);

  return (
    <div>
      {recipes.map((recipeKey, i) => (
        <ShelfItem key={i} {...recipeKey} />
      ))}
    </div>
  );
};

export default Shelf;
