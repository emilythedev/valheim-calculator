import { readWriteRecipesAtom } from '@/entities/item/atoms/recipes';
import ImportButton from '@/features/ImportButton';
import SearchInput from '@/features/item/SearchInput';
import { Stack } from '@mui/joy';
import axios from 'axios';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import FilteredList from './FilteredList';
import QueryTypeSelector from './QueryTypeSelector';

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
      minHeight={0}
    >
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
      >
        <QueryTypeSelector />
        <SearchInput />
      </Stack>
      <FilteredList />
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        <ImportButton />
      </Stack>
    </Stack>
  );
};

export default SearchSection;
