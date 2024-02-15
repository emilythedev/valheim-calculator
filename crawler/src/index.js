import { stringify } from 'csv';
import { createWriteStream } from 'fs';
import { get, map } from 'lodash-es';
import { getItemByPageId } from './item.js';

const itemList = [
  { title: 'Staff of embers', pageId: 4363 },
  { title: 'Forge', pageId: 344 },
  { title: 'Ironhead arrow', pageId: 294 },
];

Promise.all(
  itemList.map(async (item) =>{
    return await getItemByPageId(item.pageId)
  })
)
  .then(write)
  .catch(error => console.error(error));

const keyMappings = [
  ['title'],
  ['page_id', 'pageId'],
  ['internal_id', 'internalId'],
  ['source'],
  ['upgrades', 'upgrades', (list) => list.join('\n')],
].concat([1,2,3,4].map((level, i) => {
  return [
    [`level_${level}_crafting_level`, `materials[${i}].craftingLevel`],
    [`level_${level}_materials`, `materials[${i}].materials`, list => {
      return list.map(({ quantity, title }) => {
        return `${quantity}x ${title}`;
      }).join('\n');
    }],
  ];
}).flat());

function write(list) {
  const transformedList = list.map(item => {
    return keyMappings.map((mappings) => {
      if (mappings.length === 1) {
        return get(item, mappings[0], null);
      } else {
        const val = get(item, mappings[1], null);
        return mappings[2] && val ? mappings[2](val) : val;
      }
    });
  });

  const writeStream = createWriteStream('./csv/output.csv');

  const stringifier = stringify({
    header: true,
    columns: map(keyMappings, '0'),
  });

  stringifier.pipe(writeStream);

  transformedList.forEach((record) => stringifier.write(record));

  stringifier.end();
  writeStream.end();
}
