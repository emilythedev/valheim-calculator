import { filter, fromPairs, uniqBy } from 'lodash-es';
import { getItems } from './category.js';
import { getItemByPageId } from './item.js';
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
        return getItemByPageId(item.pageId);
      })
    );
  })
  .then(list => {
    const titleIdMap = fromPairs(list.map((item) => {
      const {pageId, title} = item;
      return [title.toLowerCase(), `${pageId}`];
    }));
    outputJson(titleIdMap, './output/title-id-map.json');

    const getItemIdFn = (title, level = 1) => {
      const id = titleIdMap[title.toLowerCase()];
      return id ? `${id}_${level}` : undefined
    };

    return transform(list, getItemIdFn);
  })
  .then(list => {
    return Promise.all([
      outputCsv(list, './output/output.csv'),
      outputJson(list, './output/output.json'),
    ]);
  })
  .then(([count]) => console.log(count))
  .catch(error => console.error(error));
