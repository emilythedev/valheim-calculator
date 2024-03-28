import { atom } from 'jotai';

export const searchTxtAtom = atom('');

export const readQueryTxtAtom = atom(get => {
  return get(searchTxtAtom).trim().toLowerCase();
})

const recipesAtom = atom<IItemRecipeAtom[]>([]);
export const readWriteRecipesAtom = atom(
  (get) => get(recipesAtom),
  (_, set, itemList: IItemRecipe[]) => {
    const list: IItemRecipeAtom[] = [];
    const names: string[] = [];
    itemList.forEach((item) => {
      const titleLower = item.title.toLowerCase();

      list.push({
        ...item,
        titleLower,
      });
      names.push(titleLower);
    })

    set(recipesAtom, list);
  }
);
