import { getEntity, getRecipe } from '@/data';
import MaterialList from '@/entities/recipe/MaterialList';
import Quality from '@/entities/recipe/Quality';
import { readRecipesAtom, recipeAmountAtoms } from '@/shared/atoms';
import NumberStepper from '@/shared/ui/NumberStepper';
import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/shared/ui/dialog';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { ScrollText } from 'lucide-react';

const dialogOpenAtom = atom(false);
const recipeKeyAtom = atom<RecipeKey | null>(null);
const recipeAtom = atom(get => {
  const key = get(recipeKeyAtom);
  if (!key) return null;

  const { entity, quality } = key;
  return getRecipe(entity, quality);
});
const entityAtom = atom(get => {
  const key = get(recipeKeyAtom);
  if (!key) return null;

  return getEntity(key.entity);
});

const RecipeDetailsDialog = () => {
  const [open, setOpen] = useAtom(dialogOpenAtom);
  const entity = useAtomValue(entityAtom);
  const recipe = useAtomValue(recipeAtom);

  let content = null;
  if (recipe) {
    content = (
      <div>
        <MaterialList materials={recipe.materials} />
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader className="space-y-4 mb-4">
          <DialogTitle>{ entity?.name }</DialogTitle>
          <DialogDescription asChild>
            <div className="flex flex-row">
              <Quality value={recipe?.quality || 0} />
            </div>
          </DialogDescription>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
};

const RecipeDetailsButton = ({recipe}: {recipe: RecipeKey}) => {
  const setOpen = useSetAtom(dialogOpenAtom);
  const setRecipeKey = useSetAtom(recipeKeyAtom);

  const handleClick = () => {
    setRecipeKey(recipe);
    setOpen(true);
  };

  return (
    <Button variant="outline" size="icon" onClick={() => handleClick()}>
      <ScrollText className="h-4 w-4" />
    </Button>
  );
};

const ShelfItem = ({recipe}: {recipe: RecipeKey}) => {
  const [amount, setAmount] = useAtom(recipeAmountAtoms(recipe));
  return (
    <div className="flex flex-row items-center gap-4">
      <div>{ recipe.entity }</div>
      <Quality value={recipe.quality} />
      <RecipeDetailsButton recipe={recipe}/>
      <span className="flex-1"></span>
      <NumberStepper value={amount} onChange={setAmount} />
    </div>
  );
};

const Shelf = () => {
  const recipes = useAtomValue(readRecipesAtom);

  return (
    <>
      <RecipeDetailsDialog />
      <div>
        {recipes.map((recipeKey, i) => (
          <ShelfItem key={i} recipe={recipeKey} />
        ))}
      </div>
    </>
  );
};

export default Shelf;
