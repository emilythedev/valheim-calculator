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
  const len = transformedList.length;
  let idx = 0;

  const writeStream = createWriteStream('./csv/output.csv', {
    flags: append ? 'a' : 'w',
  });

  const stringifier = stringify({
    header: true,
    columns: map(keyMappings, '0'),
  });

  const write = () => {
    let ok = true;

    while (idx < len && ok) {
      ok = stringifier.write(transformedList[idx++])
    };

    if (idx === len) {
      stringifier.end();
    } else {
      stringifier.once('drain', write);
    }
  };

  const promise = new Promise((resolve, reject) => {
    stringifier.once('error', (err) => {
      reject(err);
    });
    stringifier.once('end', () => {
      writeStream.end();
      stringifier.removeAllListeners();
      resolve(len);
    })
    stringifier.pipe(writeStream);

    write();
  });

  return promise;
};
