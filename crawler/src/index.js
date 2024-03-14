import { filter, uniqBy } from 'lodash-es';
import { getItems } from './category.js';
import { getItemsByPageId } from './item.js';
import { loadSkipPageIds } from './loader.js';
import { outputCsv, outputJson } from './output.js';
import { transform } from './transform.js';

const categories = [
  'Weapons',
  'Tools',
  // 'Armor',
  'Building_Structures',
  'Crafting_Structures',
  'Misc_Structures',
  'Furniture',
  'Cooking_recipes',
  'Fermenter_recipes',
  'Materials',
];

let skipPageIds = [];

loadSkipPageIds('./output/skip-pages.json')
  .then(pageIds => {
    skipPageIds = pageIds;

    return Promise.all(categories.map(name => {
      return getItems(name);
    }));
  })
  .then(list => {
    // remove duplicate items and skipped items
    list = filter(
      uniqBy(list.flat(), 'pageId'),
      ({pageId}) => skipPageIds.indexOf(pageId) === -1
    );

    return Promise.all(
      list.map((item) => {
        return getItemsByPageId(item.pageId);
      })
    );
  })
  .then(list => {
    list = list.flat()

    return transform(list);
  })
  .then(list => {
    return Promise.all([
      outputCsv(list, './output/output.csv'),
      outputJson(list, './output/output.json'),
    ]);
  })
  .then(([count]) => console.log(count))
  .catch(error => console.error(error));
