import commandLineArgs from 'command-line-args';
import { isArray, keys } from 'lodash-es';
import { getEntitiesByPageId } from './api/entity.js';
import { readStdin } from './utils/read.js';
import { writeFile } from './utils/write.js';

const processData = async (jsonStr) => {
  const mapping = JSON.parse(jsonStr);

  const pageIds = isArray(mapping) ? mapping : keys(mapping);
  let list = [];

  for (let i = 0; i < pageIds.length; i++) {
    const entities = await getEntitiesByPageId(parseInt(pageIds[i]));
    list = list.concat(entities);
  }

  return JSON.stringify(list);
};

const options = [
  { name: 'file', alias: 'f' },
  { name: 'output', alias: 'o' },
];

const args = commandLineArgs(options);

const inputPromise = args.file ? readFile(args.file) : readStdin();
inputPromise.then(processData)
  .then(str => {
    if (!args.output) {
      process.stdout.write(str);
    } else {
      return writeFile(args.output, str);
    }
  })
