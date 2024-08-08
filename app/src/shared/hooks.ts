import { useSetAtom } from 'jotai';
import { useCallback } from 'react';
import { dialogOpenWithRecipeAtom } from './atoms';

export const useOpenDialog = (recipe: RecipeKey) => {
  const openDialog = useSetAtom(dialogOpenWithRecipeAtom);
  const open = useCallback(() => {
    openDialog(recipe);
  }, [recipe]);

  return open;
};
