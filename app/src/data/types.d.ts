type EntityId = string;

interface Entity {
  id: EntityId,
  recipes: Recipe[],
  upgradable: boolean,
  maxQuality: number,
}

type QualityLevel = number;
interface Recipe {
  quality: QualityLevel,
  amount: number,
  craftingStation: EntityQualityList | null,
  materials: RecipeMaterials,
}

interface EntityQualityList {
  [entityId: EntityId]: QualityLevel | null,
}

interface RecipeMaterials {
  [entityId: EntityId]: number,
}

type Upgrades = EntityId[];

type CategoryId = string;
type CategoryList = CategoryId[];
interface SubCategory {
  [categoryId: CategoryId]: CategoryList,
}

interface RecipeKey {
  entity: EntityId,
  quality: number,
}

interface RecipeOnShelf {
  recipe: RecipeKey,
  amount: number,
}
