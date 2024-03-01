import { atom } from 'jotai';
import { filter, map } from 'lodash-es';

export const searchTxtAtom = atom('');

const itemListAtom = atom<ItemType[]>([]);
export const itemNamesAtom = atom<string[]>([]);

const mapTitleToLowerCase = ({title}: ItemType) => title.toLowerCase();
export const writeItemListAtom = atom(null, (_, set, list: ItemType[]) => {
  set(itemListAtom, list);
  set(itemNamesAtom, map(list, mapTitleToLowerCase));
});

export const filteredListAtom = atom((get) => {
  const searchTxt = get(searchTxtAtom).toLowerCase();
  const list = get(itemListAtom);

  if (!searchTxt) return list;

  return filter(list, ({title}) => {
    return title.toLowerCase().includes(searchTxt);
  });
});
