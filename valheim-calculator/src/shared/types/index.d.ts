interface MaterialBaseType {
  id?: string,
  title: string,
}

interface MaterialObjType extends MaterialBaseType {
  quantity: number,
}

interface ItemType {
  id: string,
  title: string,
  categories: string[],
  source: MaterialBaseType | null,
  upgrades: MaterialBaseType[],
  itemLevel: number,
  craftingLevel: number | null,
  materials: MaterialObjType[],
  maxLevel: number,
}

interface ItemAtomType extends ItemType {
  titleLower: string,
  amount: number,
}
