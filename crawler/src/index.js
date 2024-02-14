import { getItemInfo } from './item.js';

const itemList = [
  { title: 'Staff of embers', pageId: 4363 },
  { title: 'Forge', pageId: 344 },
  { title: 'Ironhead arrow', pageId: 294 },
];
itemList.forEach(item => {
  getItemInfo(item)
    .then(item => {
      console.log(JSON.stringify(item));
    })
    .catch(error => {
      console.error('Error:', error.message);
    });
});
