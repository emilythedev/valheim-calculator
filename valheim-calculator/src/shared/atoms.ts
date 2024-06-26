import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import { findIndex } from 'lodash-es';

const recipesAtom = atom<RecipeKey[]>([]);
const shelfAtom = atom<{ [key: string]: number }>({});

export const readRecipesAtom = atom(get => get(recipesAtom));

const getRecipeKeyStr = ({ entity, quality }: RecipeKey) => `${entity}|${quality}`;

export const recipeAmountAtoms = atomFamily(
  (recipe: RecipeKey) => atom(
    (get) => get(shelfAtom)[getRecipeKeyStr(recipe)] || 0,
    (_, set, amount: number) => {
      set(shelfAtom, (shelf) => {
        return {
          ...shelf,
          [getRecipeKeyStr(recipe)]: amount,
        }
      });
      set(recipesAtom, (list) => {
        const i = findIndex(list, (r) => r.entity === recipe.entity && r.quality === recipe.quality);
        if (i > -1) {
          return amount > 0 ? list : [...list.slice(0, i), ...list.slice(i + 1)];
        }
        return amount > 0 ? [...list, recipe] : list;
      });
    },
  ),
  (a, b) => (a.entity === b.entity && a.quality === b.quality)
);
