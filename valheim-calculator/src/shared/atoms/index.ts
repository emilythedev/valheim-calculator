import { atom } from 'jotai';
import { filter } from 'lodash-es';

export const searchTxtAtom = atom('');

export const itemListAtom = atom<ItemType[]>([]);
export const filteredListAtom = atom((get) => {
  const searchTxt = get(searchTxtAtom).toLowerCase();
  const list = get(itemListAtom);

  if (!searchTxt) return list;

  return filter(list, ({title}) => {
    return title.toLowerCase().includes(searchTxt);
  });
});
