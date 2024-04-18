import { readWriteRecipesAtom } from '@/entities/item/atoms/recipes';
import { Button } from '@mui/joy';
import { useSetAtom } from 'jotai';
import { ChangeEvent, useRef } from 'react';

const ImportButton = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const setItemList = useSetAtom(readWriteRecipesAtom);

  const handleFileChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          setItemList(data);
        } catch (error) {
          // TODO: handle error
          console.error(error);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
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
