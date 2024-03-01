import { atom } from 'jotai';

export const searchTxtAtom = atom('');

export const itemListAtom = atom<ItemType[]>([]);
