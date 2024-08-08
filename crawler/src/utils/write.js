import { writeFile as fsWriteFile } from 'fs/promises';

export const writeFile = (filePath, str) => {
  return fsWriteFile(filePath, str, {
    encoding: 'utf8',
  });
};
