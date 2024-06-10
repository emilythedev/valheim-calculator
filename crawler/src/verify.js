import { forOwn } from 'lodash-es';
import { readStdin } from './utils/read.js';

const results = {};

const report = (reason, entity) => {
  if (!results[reason]) {
    results[reason] = [];
  }
  results[reason].push({
    title: entity.title,
    pageId: entity.pageId,
  });
}

const reportDuplicated = (entity) => report('duplicated', entity);
const reportNoRecipes = (entity) => report('no_recipes', entity);
const reviewStation = (entity) => report('review_station', entity);
const validCraftingStations = [
  'Artisan table',
  'Black forge',
  'Cauldron',
  'Cooking station',
  'Eitr refinery',
  'Fermenter',
  'Forge',
  'Galdr table',
  'Iron cooking station',
  // 'Player crafting menu',
  'Spinning wheel',
  'Stone oven',
  'Stonecutter',
  'Windmill',
  'Workbench',
];
const reportMaterialNameEmpty = (entity) => report('material_no_name', entity);
const reportZeroQuantity = (entity) => report('zero_quantity', entity);

const printReport = () => {
  forOwn(results, (details, reason) => {
    details.forEach((detail) => {
      console.log(`[${reason}]`, JSON.stringify(detail));
    });
  });
};

const verify = (entity) => {
  const { recipes } = entity;

  if (recipes.length === 0) {
    reportNoRecipes(entity);
    return;
  }

  for (let i = 0; i < recipes.length; i++) {
    const { craftingStation, materials } = recipes[i];
    if (craftingStation && craftingStation.title &&
        (validCraftingStations.indexOf(craftingStation.title) === -1 ||
        craftingStation.title.indexOf(',') > -1)) {
      reviewStation(entity);
    }

    for (let j = 0; j < materials.length; j++) {
      const { title, quantity } = materials[j];
      if (quantity === 0) {
        reportZeroQuantity(entity);
        break;
      }
      if (!title || title.toLowerCase() === 'n/a') {
        reportMaterialNameEmpty(entity);
        break;
      }
    }
  }
};

const processData = (jsonStr) => {
  const list = JSON.parse(jsonStr);

  const names = new Set();
  for (let i = 0; i < list.length; i++) {
    const entity = list[i];
    verify(entity);

    if (names.has(entity.title)) {
      reportDuplicated(entity);
    } else {
      names.add(entity.title);
    }
  }

  printReport();
};

readStdin(processData);
