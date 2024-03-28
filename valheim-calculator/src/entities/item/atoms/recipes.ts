import { atom } from 'jotai';

export const searchTxtAtom = atom('');
export const readWriteSearchTxtAtom = atom(
  (get) => get(searchTxtAtom),
  (get, set, text: string) => {
    set(searchTxtAtom, text);
  }
);

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
