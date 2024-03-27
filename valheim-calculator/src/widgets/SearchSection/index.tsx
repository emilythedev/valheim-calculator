import { writeRecipesAtom } from '@/entities/item/atoms/recipes';
import SearchInput from '@/features/item/SearchInput';
import { Sheet, Stack } from '@mui/joy';
import axios from 'axios';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import FilteredTable from './FilteredTable';

const SearchSection = () => {
  const setItemList = useSetAtom(writeRecipesAtom);
  useEffect(() => {
    axios.get('/data.json')
      .then(({data}) => {
        setItemList(data);
      });
    // TODO: error handling
  }, [setItemList]);

  return (
    <Stack
      flexGrow={1}
      direction="column"
      justifyContent="flex-start"
      alignItems="stretch"
      spacing={4}
      mb={4}
      minHeight={0}
    >
      <SearchInput />
      <Sheet sx={{ flexGrow: 1, overflow: 'auto' }}>
        <FilteredTable />
      </Sheet>
    </Stack>
  );
};

export default SearchSection;
