import { atom } from 'jotai';
import { atomFamily, atomWithStorage, createJSONStorage } from 'jotai/utils';
import { get as _get, set as _set, findIndex, omit } from 'lodash-es';

const recipesAtom = atomWithStorage(
  'vcList',
  [],
  createJSONStorage<RecipeKey[]>(() => localStorage),
  { getOnInit: true }
);
const shelfAtom = atomWithStorage(
  'vcShelf',
  {},
  createJSONStorage<{ [key: string]: number }>(() => localStorage),
  { getOnInit: true }
);

export const readRecipesAtom = atom(get => get(recipesAtom));

const getRecipeKeyPath = ({ entity, quality }: RecipeKey) => `${entity}|${quality}`;

export const recipeAmountAtoms = atomFamily(
  (recipe: RecipeKey) => atom(
    (get) => _get(get(shelfAtom), getRecipeKeyPath(recipe)) || 0,
    (_, set, amount: number) => {
      set(shelfAtom, (shelf) => {
        const path = getRecipeKeyPath(recipe);
        const newValue = omit(shelf, [path]);
        if (amount > 0) {
          _set(newValue, path, amount);
        }
        return newValue;
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
