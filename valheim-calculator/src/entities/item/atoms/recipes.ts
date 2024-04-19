import { atom } from 'jotai';
import { atomWithReducer } from 'jotai/utils';

// Atoms for filter function
const filterOptionsAtom = atomWithReducer<IQueryOptions, IQueryOptions>(
  { key: 'title', value: '' },
  (prev, next) => {
    if (!next || prev.key === next.key && prev.value === next.value) {
      return prev;
    }

    return next;
  }
);

export const readFilterOptionsAtom = atom(get => {
  return get(filterOptionsAtom);
});


// Atoms for filter form values
export const querySelectInputAtom = atom<FilterType>('title');
export const queryTextInputAtom = atom('');


// Atom for updating filtering options and form values
interface UpdateQueryFormAction {
  key: QueryKey,
  value: string | number[],
  selectValue?: FilterType, // set <select> value
  inputText?: string, // set input text value
}

export const writeQueryFormAtom = atom(
  null,
  (get, set, action: UpdateQueryFormAction) => {
    set(filterOptionsAtom, {
      key: action.key,
      value: typeof action.value === 'string' ?
        action.value.trim().toLowerCase() :
        action.value,
    })
    if (typeof action.inputText !== 'undefined') {
      set(queryTextInputAtom, `"${action.inputText}"`);
      set(querySelectInputAtom, action.selectValue || 'title');
    }
  }
)


// Atom for recipes
const recipesAtom = atom<IItemRecipeAtom[]>([]);
export const readWriteRecipesAtom = atom(
  (get) => get(recipesAtom),
  (_, set, itemList: IItemRecipe[]) => {
    const list: IItemRecipeAtom[] = [];
    itemList.forEach((item) => {
      const titleLower = item.title.toLowerCase();

      list.push({
        ...item,
        titleLower,
      });
    })

    set(recipesAtom, list);
  }
);
