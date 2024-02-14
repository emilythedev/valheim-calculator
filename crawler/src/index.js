import { getItems } from './category';


getItems('Weapons')
  .then(() => {
    console.log(itemList.length);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
