import { uniqBy } from 'lodash-es';
import { getItems } from './category.js';
import { getItemByPageId } from './item.js';
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
];

Promise.all(categories.map(name => {
  return getItems(name);
}))
  .then(list => {
    // remove duplicate items
    list = uniqBy(list.flat(), 'pageId');

    return Promise.all(
      list.map((item) => {
        return getItemByPageId(item.pageId);
      }),
    );
  })
  .then(list => {
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
