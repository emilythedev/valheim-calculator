import { queryTextInputAtom, writeQueryFormAtom } from '@/entities/item/atoms/recipes';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, Input, Stack } from '@mui/joy';
import { useAtom, useSetAtom } from 'jotai';
import { FormEvent } from 'react';
import TypeSelector from './TypeSelector';

const QueryForm = () => {
  const [inputValue, setInputValue] = useAtom(queryTextInputAtom);
  const setQueryInput = useSetAtom(writeQueryFormAtom);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    setQueryInput({
      key: data.queryType as FilterType,
      value: data.queryInputValue as string,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="row" justifyContent="flex-start" alignItems="center" gap={1}>
        <TypeSelector name="queryType" />

        <Input
          name="queryInputValue"
          placeholder="Item name"
          variant="soft"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          endDecorator={inputValue ? (
            <IconButton
              data-textid="cy-btn-clearSearchValue"
              onClick={() => setInputValue('')}
            >
              <CancelIcon />
            </IconButton>
          ) : undefined}
          sx={{ flexGrow: 1 }}
        />

        <IconButton
          type="submit"
          variant="solid"
          color="primary"
        ><SearchIcon /></IconButton>
      </Stack>
    </form>
  );
}

export default QueryForm
