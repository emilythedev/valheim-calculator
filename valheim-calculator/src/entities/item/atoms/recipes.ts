import { atom } from 'jotai';

export const searchTxtAtom = atom('');
export const queryTypeAtom = atom<FilterType>('title');

export const readQueryTxtAtom = atom(get => {
  return get(searchTxtAtom).trim().toLowerCase();
})

export const writeSearchUpgradesByNameAtom = atom(null, (get, set, itemName: string) => {
  set(searchTxtAtom, `"${itemName}"`);
  set(queryTypeAtom, 'upgrades');
});

const recipesAtom = atom<IItemRecipeAtom[]>([]);
export const readWriteRecipesAtom = atom(
  (get) => get(recipesAtom),
  (_, set, itemList: IItemRecipe[]) => {
    const list: IItemRecipeAtom[] = [];
    itemList.forEach((item) => {
      const titleLower = item.title.toLowerCase();

      list.push({
        ...item,
        titleLower,
      });
    })

    set(recipesAtom, list);
  }
);
