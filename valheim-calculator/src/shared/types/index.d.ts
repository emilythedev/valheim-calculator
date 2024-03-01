interface MaterialObjType {
  title: string,
  quantity: number,
}

type MaterialType = MaterialObjType | string;

interface ItemType {
  title: string,
  categories: string[],
  source: string,
  upgrades: string[],
  itemLevel: number,
  craftingLevel: number | null,
  materials: MaterialType[],
  maxLevel: number,
}
