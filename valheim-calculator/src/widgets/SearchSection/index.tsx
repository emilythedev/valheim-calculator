import { readWriteRecipesAtom } from '@/entities/item/atoms/recipes';
import SearchInput from '@/features/item/SearchInput';
import { Stack } from '@mui/joy';
import axios from 'axios';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import FilteredList from './FilteredList';

const SearchSection = () => {
  const setItemList = useSetAtom(readWriteRecipesAtom);
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
      <FilteredList />
    </Stack>
  );
};

export default SearchSection;
