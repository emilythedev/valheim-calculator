import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import { filter, findIndex, transform } from 'lodash-es';

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

type AmountMapAtomType = {[id: number]: number};

const wishlistAtom = atom<IItemRecipeAtom[]>([]);
const amountMapAtom = atom<AmountMapAtomType>({});

export const wishlistAmountAtomFamily = atomFamily((id: number) => atom(
  (get) => get(amountMapAtom)[id] || 0,
  (get, set, amount: number, item: IItemRecipeAtom) => {
    const mapping = get(amountMapAtom);
    if (amount > 0) {
      set(amountMapAtom, {...mapping, [id]: amount});
      if (!mapping[id]) {
        set(wishlistAtom, (list) => [...list, item]);
      }
    } else {
      set(amountMapAtom, {...mapping, [id]: 0});
      set(wishlistAtom, (list) => {
        const itemIdx = findIndex(list, {id});
        if (itemIdx > -1) {
          const newList = [...list]
          newList.splice(itemIdx, 1);
          return newList;
        }
        return list;
      });
    }
  }
));

export const readWishlistAtom = atom((get) => get(wishlistAtom));

export const materialSummaryAtom = atom((get) => {
  const wishlist = get(wishlistAtom);

  const materials: {[title: string]: number} = {};
  wishlist.forEach((item) => {
    const amount = get(wishlistAmountAtomFamily(item.id));
    item.materials.forEach((material) => {
      if (!materials[material.title]) {
        materials[material.title] = 0;
      }
      materials[material.title] += material.quantity * amount;
    })
  });

  return transform(materials, (result: IRecipeMaterial[], value, key) => {
    result.push({title: key, quantity: value});
  }, []);
});
