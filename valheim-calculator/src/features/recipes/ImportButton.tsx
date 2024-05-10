import { readWriteRecipesAtom } from '@/entities/item/atoms/recipes';
import { Button } from '@mui/joy';
import { useSetAtom } from 'jotai';
import { ChangeEvent, useRef } from 'react';

const ImportButton = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const setItemList = useSetAtom(readWriteRecipesAtom);

  const handleFileChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    e.target.value = '';

    if (file) {
      if (file.type !== 'application/json') {
        // TODO: prompt invalid file
        console.error('Invalid file type', file.type);
      } else {
        const reader = new FileReader();

        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target?.result as string);
            setItemList(data);
            console.log('Imported');
          } catch (error) {
            // TODO: prompt invalid JSON
            console.error('Invalid JSON', error);
          }
        };
        reader.onerror = (e) => {
          // TODO: prompt file read error
          console.error('Error while reading file', e);
        };

        console.log('Reading file', file.name);
        reader.readAsText(file);
      }
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
