import { stringify } from 'csv';
import { createWriteStream } from 'fs';
import { writeFile } from 'fs/promises';
import { get, map } from 'lodash-es';
import { csvKeyMappings } from './constants.js';

export const outputCsv = (list, filePath, append = false) => {
  const transformedList = list.map(item => {
    return csvKeyMappings.map((mappings) => {
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

  const writeStream = createWriteStream(filePath, {
    flags: append ? 'a' : 'w',
  });

  const stringifier = stringify({
    header: true,
    columns: map(csvKeyMappings, '0'),
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

export const outputJson = (list, filePath) => {
  const data = JSON.stringify(list);

  return writeFile(filePath, data);
};
