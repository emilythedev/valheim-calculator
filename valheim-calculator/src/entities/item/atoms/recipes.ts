import { atom } from 'jotai';
import { filter } from 'lodash-es';

export const searchTxtAtom = atom('');
export const readWriteSearchTxtAtom = atom(
  (get) => get(searchTxtAtom),
  (get, set, text: string) => {
    set(searchTxtAtom, text);
    set(lazyLoadIndex, CHUNK_SIZE);
  }
);

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

const CHUNK_SIZE = 30;
const lazyLoadIndex = atom(CHUNK_SIZE);

export const readLazyLoadIndex = atom(get => get(lazyLoadIndex));

export const writeLazyLoadMore = atom(null,
  (get, set) => {
    if (get(filteredListAtom).length < get(lazyLoadIndex)) {
      return;
    }

    set(lazyLoadIndex, i => i + CHUNK_SIZE);
  },
);
