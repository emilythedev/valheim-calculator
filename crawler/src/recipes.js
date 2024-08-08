import commandLineArgs from 'command-line-args';
import { transform } from 'lodash-es';
import { readFile, readStdin } from './utils/read.js';
import { writeFile } from './utils/write.js';

const processData = (jsonStr, mappingStr) => {
  const list = JSON.parse(jsonStr);
  const titleToId = transform(JSON.parse(mappingStr), (res, val, key) => {
    res[val.toLowerCase()] = key;
  });
  const getId = (title) => {
    const id = titleToId[title.toLowerCase()];
    return id || `#${title}#`;
  };
  const convertStation = ({ title, level }) => {
    if (!title) return null;
    return { [getId(title)]: level || 1 };
  };
  const convertMaterials = (materials) => {
    const m = {};
    materials.forEach(({ title, quantity }) => {
      m[getId(title)] = quantity;
    });
    return m;
  };

  const allRecipes = [];

  list.forEach(({ title, recipes }) => {
    allRecipes.push([
      getId(title),
      recipes.map(({ quality, craftingStation, amount, materials }) => {
        return [
          quality,
          amount,
          craftingStation ? convertStation(craftingStation) : null,
          convertMaterials(materials),
        ];
      }),
    ]);
  });

  return '[\n' + allRecipes.map(JSON.stringify).sort().join(',\n') + '\n]';
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
