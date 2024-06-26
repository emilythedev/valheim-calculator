import Quality from '@/entities/recipe/Quality';
import { readRecipesAtom, recipeAmountAtoms } from '@/shared/atoms';
import { useAtomValue } from 'jotai';

const ShelfItem = (recipe: RecipeKey) => {
  const amount = useAtomValue(recipeAmountAtoms(recipe));
  return (
    <div>
      <div>{ recipe.entity }</div>
      <Quality value={recipe.quality} />
      {amount}
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
