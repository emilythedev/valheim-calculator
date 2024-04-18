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

type FilterType = 'title' | 'upgrades';
