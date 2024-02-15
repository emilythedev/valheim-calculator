import { reject } from 'lodash-es';
import { getItems } from './category.js';
import { getItemByPageId } from './item.js';
import { output } from './output.js';

getItems('Weapons')
  .then(list => {
    return Promise.all(
      list.map(async (item) =>{
        return await getItemByPageId(item.pageId)
      })
    );
  })
  .then((list) => {
    output(
      reject(list, ({ title, source }) => {
        if (!source || source === 'n/a' || source.indexOf('Console Commands') !== -1) {
          console.log(`[${title}] has invalid source.`);
          return true;
        }
        return false;
      }),
      './csv/output.csv'
    );
  })
  .catch(error => console.error(error));
