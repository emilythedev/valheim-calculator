import { forOwn, groupBy, map, pick } from 'lodash-es';
import { readStdin } from './utils/read.js';

const processData = async (jsonStr) => {
  const data = JSON.parse(jsonStr);

  const recipes = data.map((item) => {
    return {
      ...pick(item, ['pageId', 'title', 'maxQuality', 'categories']),
      upgrades: map(item.upgrades, 'title'),
      quality: item.qualityLevel,
      craftingStation: {
        title: (item.source ? map(item.source, 'title').join(',') : null ),
        level: item.craftingLevel,
      },
      materials: item.materials.map(({title, quantity}) => ({title, quantity})),
      amount: item.craftingAmount,
    };
  });

  const entities = groupBy(recipes, 'title');
  const list = [];
  forOwn(entities, (recipes, title) => {
    list.push({
      pageId: recipes[0].pageId,
      title,
      upgrades: recipes[0].upgrades,
      recipes: recipes.map(recipe => pick(recipe, ['quality', 'craftingStation', 'materials', 'amount'])),
      categories: recipes[0].categories,
    });
  });

  process.stdout.write(JSON.stringify(list));
};

readStdin(processData);
