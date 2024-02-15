import { reject } from 'lodash-es';
import { getItems } from './category.js';
import { omitPageIds } from './constants.js';
import { getItemByPageId } from './item.js';
import { output } from './output.js';

// const itemList = [
//   { title: 'Staff of embers', pageId: 4363 },
//   { title: 'Forge', pageId: 344 },
//   { title: 'Ironhead arrow', pageId: 294 },
// ];

getItems('Workbench_recipes')
  .then(list => {
    list = reject(list, ({ pageId }) => omitPageIds.indexOf(pageId) !== -1);

    return Promise.all(
      list.map(async (item) =>{
        return await getItemByPageId(item.pageId)
      })
    );
  })
  .then((list) => {
    output(list, './csv/output.csv');
  })
  .catch(error => console.error(error));
