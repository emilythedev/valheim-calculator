interface MaterialBaseType {
  id?: string,
  title: string,
}

interface CraftingMaterialType extends MaterialBaseType {
  quantity: number,
}

interface ItemType {
  id: number,
  title: string,
  categories: string[],
  source: MaterialBaseType[],
  upgrades: MaterialBaseType[],
  qualityLevel: number,
  craftingLevel: number | null,
  craftingAmount: number,
  materials: CraftingMaterialType[],
  maxQuality: number,
}

interface ItemAtomType extends ItemType {
  titleLower: string,
}
