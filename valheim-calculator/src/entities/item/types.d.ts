interface IMaterial {
  id?: string,
  title: string,
}

interface IRecipeMaterial extends IMaterial {
  quantity: number,
}

interface IItemRecipe {
  id: number,
  title: string,
  categories: string[],
  source: IMaterial[],
  upgrades: IMaterial[],
  qualityLevel: number,
  craftingLevel: number | null,
  craftingAmount: number,
  materials: IRecipeMaterial[],
  maxQuality: number,
}

interface IItemRecipeAtom extends IItemRecipe {
  titleLower: string,
}
