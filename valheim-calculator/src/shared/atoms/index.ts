import { atom } from 'jotai';
import { filter } from 'lodash-es';

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
