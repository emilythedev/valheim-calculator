import { getRecipe } from '@/data';
import { atom } from 'jotai';
import { atomFamily, atomWithStorage, createJSONStorage } from 'jotai/utils';
import { get as _get, set as _set, findIndex, forOwn, omit } from 'lodash-es';

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

const getPath = ({ entity, quality }: RecipeKey) => `${entity}|${quality}`;

export const recipeAmountAtoms = atomFamily(
  (recipe: RecipeKey) => {
    const path = getPath(recipe);
    return atom(
      (get) => _get(get(shelfAtom), path, 0),
      (_, set, amount: number) => {
        set(shelfAtom, (shelf) => {
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
    );
  },
  (a, b) => (a.entity === b.entity && a.quality === b.quality)
);

export const summaryAtom = atom(get => {
  const shelf = get(shelfAtom);
  const list = get(recipesAtom);
  const allMaterials: RecipeMaterials = {};
  const stations: EntityQualityList = {};

  list.forEach((recipeKey) => {
    const { entity, quality } = recipeKey;
    const recipe = getRecipe(entity, quality);

    if (!recipe) return;

    const amount = _get(shelf, getPath(recipeKey), 0);
    const { craftingStation, materials } = recipe;

    forOwn(materials, (n, id) => {
      if (typeof allMaterials[id] === 'undefined') {
        allMaterials[id] = 0;
      }

      allMaterials[id] += n * amount;
    });

    forOwn(craftingStation, (quality, id) => {
      stations[id] = Math.max(stations[id] || 0, quality || 0);
    });
  });

  return {
    materials: allMaterials,
    stations: stations,
  };
});
