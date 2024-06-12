import commandLineArgs from 'command-line-args';
import { invertBy, size, startCase } from 'lodash-es';
import { readFile, readStdin } from './utils/read.js';

const processData = (jsonStr, mappingStr) => {
  const list = JSON.parse(jsonStr);
  const prevMapping = JSON.parse(mappingStr);
  const titleToId = invertBy(prevMapping, val => val.toLowerCase());

  const mapping = {};
  const addTitle = (title) => {
    if (titleToId[title.toLowerCase()]) return;

    const id = startCase(title).replace(/\s/g, '');
    if (prevMapping[id]) {
      throw new Error(`ID '${id}' have multiple titles. (${prevMapping[id]}, ${title})`);
    }
    if (!mapping[id]) {
      mapping[id] = title;
    }
  };

  for (let i = 0; i < list.length; i++) {
    const entity = list[i];
    addTitle(entity.title);

    entity.recipes.forEach((recipe) => {
      const materials = recipe.materials;

      materials.forEach((material) => {
        addTitle(material.title);
      });
    });
  }

  console.log(`${size(mapping)} new entries.`)

  return JSON.stringify({...prevMapping, ...mapping});
};

const options = [
  { name: 'file', alias: 'f' },
  { name: 'mapping', alias: 'm' },
  { name: 'output', alias: 'o' },
];

const args = commandLineArgs(options);

const inputPromise = args.file ? readFile(args.file) : readStdin();
const mappingPromise = args.mapping ? readFile(args.mapping) : '{}';
Promise.all([inputPromise, mappingPromise])
  .then(([inputStr, mappingStr]) => processData(inputStr, mappingStr))
  .then(str => {
    if (!args.output) {
      process.stdout.write(str);
    } else {
      return writeFile(args.output, str);
    }
  });
