import { readFile } from 'fs/promises';
import { map } from 'lodash-es';

export const loadSkipPageIds = async (filePath) => {
  if (!filePath) return [];

  const contents = await readFile(filePath, { encoding: 'utf8' });
  const arr = JSON.parse(contents);
  return map(arr, 'pageId');
};
