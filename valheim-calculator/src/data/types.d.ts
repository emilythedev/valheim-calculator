type EntityId = string;

interface Entity {
  id: EntityId,
  recipes: Recipe[],
}

type QualityLevel = number;
interface Recipe {
  quality: QualityLevel,
  amount: number,
  craftingStation: CraftingStation | null,
  materials: RecipeMaterials,
}

interface CraftingStation {
  [EntityId]: QualityLevel | null,
}

interface RecipeMaterials {
  [EntityId]: number,
}

type Upgrades = EntityId[];

type CategoryId = string;
type CategoryList = CategoryId[];
interface SubCategory {
  [CategoryId]: CategoryList,
}
