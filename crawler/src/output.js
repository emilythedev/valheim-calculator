import { stringify } from 'csv';
import { createWriteStream } from 'fs';
import { get, map } from 'lodash-es';
import { keyMappings } from './constants.js';

export const output = (list, filePath, append = false) => {
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

  const writeStream = createWriteStream('./csv/output.csv', {
    flags: append ? 'a' : 'w',
  });

  const stringifier = stringify({
    header: true,
    columns: map(keyMappings, '0'),
  });

  stringifier.pipe(writeStream);

  transformedList.forEach((record) => stringifier.write(record));

  stringifier.end();
  writeStream.end();

  return filePath;
};
