import { reject } from 'lodash-es';
import { getItems } from './category.js';
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
];

Promise.all(
  categories.map(name => getItems(name))
).then(list => {
    return Promise.all(
      list.flat().map(async (item) =>{
        return await getItemByPageId(item.pageId)
      })
    );
  })
  .then((list) => {
    const filteredList = reject(list, ({ title, source, internalId }) => {
      if (source === 'n/a' || source.indexOf('Commands') !== -1 || source === 'Hildir') {
        console.log(`[${title}] has invalid source.`);
        return true;
      }
      if (!source && !internalId) {
        console.log(`[${title}] has invalid source & internal ID.`);
        return true;
      }
      return false;
    })

    return Promise.all([
      outputCsv(
        filteredList,
        './output/output.csv'
      ),
      outputJson(
        filteredList,
        './output/output.json'
      )
    ]);
  })
  .then(([count]) => console.log(count))
  .catch(error => console.error(error));
