import { groupBy, reject } from 'lodash-es';
import { getItems } from './category.js';
import { categoryMappings } from './constants.js';
import { getItemByPageId } from './item.js';
import { outputCsv, outputJson } from './output.js';

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

Promise.all(
  categories.map(name => {
    return getItems(name)
      .then(list => {
        return Promise.all(
          list.map((item) => {
            return getItemByPageId(item.pageId)
              .then(item => ({ ...item, category: categoryMappings[name] }));
          })
        );
      });
  })
).then(list => {
  // filter
  return reject(list.flat(), ({ title, source, internalId, levels }) => {
    if (source && (
      source === 'n/a' ||
      source.indexOf('Commands') !== -1 ||
      source === 'Hildir'
    )) {
      console.log(`[${title}] is skipped. (source)`);
      return true;
    }
    if (!source && !internalId) {
      console.log(`[${title}] is skipped. (source, internal ID)`);
      return true;
    }
    if (levels.length === 0) {
      console.log(`[${title}] is skipped. (levels)`);
      return true;
    }
    return false;
  });
})
.then(list => {
  return Promise.all([
    outputCsv(list, './output/output.csv'),
    outputJson(groupBy(list, 'category'), './output/output.json')
  ]);
})
.then(([count]) => console.log(count))
.catch(error => console.error(error));
