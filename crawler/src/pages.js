import { fromPairs, map, uniqBy } from 'lodash-es';
import { getItems } from './api/category.js';

const categories = [
  'Weapons',
  'Tools',
  'Armor',
  'Building_structures',
  'Crafting_structures',
  'Misc_structures',
  'Furniture',
  'Cooking_recipes',
  'Fermenter_recipes',
  'Materials',
];

const fetchAllCategories = async () => {
  const lists = [];
  for (let i = 0; i < categories.length; i++) {
    const items = await getItems(categories[i]);
    lists.push(items);
  }
  return lists;
}

fetchAllCategories()
  .then(lists => {
    const list = uniqBy(lists.flat(), 'canonicalUrl');

    const pairs = map(list, ({ pageId, canonicalUrl }) => {
      return [ pageId, canonicalUrl ]
    });

    return fromPairs(pairs);
  })
  .then(mapping => {
    process.stdout.write(JSON.stringify(mapping));
  });
