import commandLineArgs from 'command-line-args';
import { isArray, keys } from 'lodash-es';
import { getEntitiesByPageId } from './api/entity.js';
import { readStdin } from './utils/read.js';

const processData = async (jsonStr) => {
  const mapping = JSON.parse(jsonStr);

  const pageIds = isArray(mapping) ? mapping : keys(mapping);
  let list = [];

  for (let i = 0; i < pageIds.length; i++) {
    const entities = await getEntitiesByPageId(parseInt(pageIds[i]));
    list = list.concat(entities);
  }

  process.stdout.write(JSON.stringify(list));
};

const options = [
  { name: 'file', alias: 'f' },
];

const args = commandLineArgs(options);

if (!args.file) {
  readStdin().then(processData);
} else {
  readFile(args.file).then(processData);
}
