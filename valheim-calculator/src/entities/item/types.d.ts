interface IMaterial {
  id?: number,
  title: string,
}

interface IRecipeMaterial extends IMaterial {
  quantity: number,
}

interface IItemRecipe {
  id: number,
  title: string,
  categories: string[],
  source: IMaterial[] | null,
  upgrades: IMaterial[],
  qualityLevel: number, // level of item
  craftingLevel: number | null, // level of source
  craftingAmount: number,
  materials: IRecipeMaterial[],
  maxQuality: number,
}

interface IItemRecipeAtom extends IItemRecipe {
  titleLower: string,
}

// <select> option values for filtering
type FilterType = 'title' | 'upgrades';

// for filter function
type QueryKey = FilterType | 'id';

type QueryValue<K extends QueryKey> = K extends 'id' ? number[] : string;

interface IQueryOptions {
  key: QueryKey,
  value: QueryValue<QueryKey>,
}
