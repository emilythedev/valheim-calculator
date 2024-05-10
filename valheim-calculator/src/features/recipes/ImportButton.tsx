import { readWriteRecipesAtom } from '@/entities/item/atoms/recipes';
import { Button } from '@mui/joy';
import { useSetAtom } from 'jotai';
import { ChangeEvent, useRef } from 'react';
import toast from 'react-hot-toast';

interface readFileResult {
  data: IItemRecipe[],
}

const readFileAsync = (file: File) => {
  const promise = new Promise<readFileResult>((resolve, reject) => {
    if (file.type !== 'application/json') {
      reject(new Error('Invalid file type'));
    } else {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          resolve({
            data,
          });
        } catch (error) {
          reject('Invalid file content');
        }
      };

      reader.onerror = () => {
        reject('Error while reading file');
      };

      reader.readAsText(file);
    }
  });

  return promise;
};

const ImportButton = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const setItemList = useSetAtom(readWriteRecipesAtom);

  const handleFileChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    e.target.value = '';

    if (file) {
      const promise = readFileAsync(file)
        .then((result) => {
          try {
            setItemList(result.data);
          } catch (error) {
            throw new Error('Invalid JSON content');
          }
          return result;
        });
      toast.promise(promise, {
        loading: `Importing ${file.name}`,
        success: () => `${file.name} has been imported.` ,
        error: (error) => `Import failed. (${error.message})`,
      });
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <input
        data-testid="cy-input-import"
        ref={fileInputRef}
        type="file"
        accept="application/json"
        onChange={handleFileChanged}
        style={{ display: 'none' }}
      />
      <Button
        onClick={handleClick}
        color="primary"
        variant="plain"
      >Import own data</Button>
    </>
  );
};

export default ImportButton;
