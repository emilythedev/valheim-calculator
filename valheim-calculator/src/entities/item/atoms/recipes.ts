import { atom } from 'jotai';
import { filter } from 'lodash-es';

export const searchTxtAtom = atom('');

const recipesAtom = atom<IItemRecipeAtom[]>([]);
export const writeRecipesAtom = atom(null, (_, set, itemList: IItemRecipe[]) => {
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
});

export const filteredListAtom = atom((get) => {
  const searchTxt = get(searchTxtAtom).toLowerCase();
  const list = get(recipesAtom);

  if (!searchTxt) return list;

  return filter(list, ({titleLower}) => {
    return titleLower.includes(searchTxt);
  });
});
