import { filter, find, uniqBy } from 'lodash-es';
import { getItems } from './category.js';
import { getItemsByPageId } from './item.js';
import { loadSkipPageIds } from './loader.js';
import { outputCsv, outputJson } from './output.js';
import { appendItemId, transform } from './transform.js';

const categories = [
  'Weapons',
  'Tools',
  'Armor',
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

    console.log('Getting category members...');

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

    console.log('Parsing item pages...');

    return Promise.all(
      list.map((item) => {
        return getItemsByPageId(item.pageId);
      })
    );
  })
  .then(list => {
    list = transform(list.flat());
    const itemBasicInfos = [];

    console.log('Assigning item ID...');

    list = list.map((item, i) => {
      const id = i + 1;

      itemBasicInfos.push({
        id,
        title: item.title.toLowerCase(),
        qualityLevel: item.qualityLevel,
        pageId: item.pageId,
      });

      return {
        id,
        ...item,
      }
    });

    const searchIdByTitleAndQuality = (title, qualityLevel) => {
      const found = find(itemBasicInfos, {
        title: title.toLowerCase(),
        qualityLevel: qualityLevel || 1,
      });

      return found ? found.id : undefined;
    };

    list = appendItemId(list, searchIdByTitleAndQuality);

    return [list, itemBasicInfos];
  })
  .then(([list, itemBasicInfos]) => {
    console.log('Exporting output...');

    return Promise.all([
      outputCsv(list, './output/output.csv'),
      outputJson(list, './output/output.json'),
      outputJson(itemBasicInfos, './output/items.json'),
    ]);
  })
  .then(([count]) => console.log(count))
  .catch(error => console.error(error));
