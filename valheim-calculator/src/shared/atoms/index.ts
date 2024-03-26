import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import { filter, findIndex, transform } from 'lodash-es';

export const searchTxtAtom = atom('');

const itemListAtom = atom<ItemAtomType[]>([]);
export const itemNamesAtom = atom<string[]>([]);

export const writeItemListAtom = atom(null, (_, set, itemList: ItemType[]) => {
  const list: ItemAtomType[] = [];
  const names: string[] = [];
  itemList.forEach((item) => {
    const titleLower = item.title.toLowerCase();

    list.push({
      ...item,
      titleLower,
    });
    names.push(titleLower);
  })

  set(itemListAtom, list);
  set(itemNamesAtom, names);
});

export const filteredListAtom = atom((get) => {
  const searchTxt = get(searchTxtAtom).toLowerCase();
  const list = get(itemListAtom);

  if (!searchTxt) return list;

  return filter(list, ({titleLower}) => {
    return titleLower.includes(searchTxt);
  });
});

type IdAmountMappingAtomType = {[id: number]: number};
const wishListAtom = atom<ItemAtomType[]>([]);
const idAmountMappingAtom = atom<IdAmountMappingAtomType>({});

export const wishListItemAmountAtomFamily = atomFamily((id: number) => atom(
  (get) => get(idAmountMappingAtom)[id] || 0,
  (get, set, amount: number, item: ItemAtomType) => {
    const mapping = get(idAmountMappingAtom);
    if (amount > 0) {
      set(idAmountMappingAtom, {...mapping, [id]: amount});
      if (!mapping[id]) {
        set(wishListAtom, (list) => [...list, item]);
      }
    } else {
      set(idAmountMappingAtom, {...mapping, [id]: 0});
      set(wishListAtom, (list) => {
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

export const readWishlistAtom = atom((get) => get(wishListAtom));

export const totalMaterialsAtom = atom((get) => {
  const wishlist = get(wishListAtom);

  const materials: {[title: string]: number} = {};
  wishlist.forEach((item) => {
    const amount = get(wishListItemAmountAtomFamily(item.id));
    item.materials.forEach((material) => {
      if (!materials[material.title]) {
        materials[material.title] = 0;
      }
      materials[material.title] += material.quantity * amount;
    })
  });

  return transform(materials, (result: CraftingMaterialType[], value, key) => {
    result.push({title: key, quantity: value});
  }, []);
});
