import { readWriteRecipesAtom } from '@/entities/item/atoms/recipes';
import ImportButton from '@/features/recipes/ImportButton';
import QueryForm from '@/features/recipes/QueryForm';
import { Stack } from '@mui/joy';
import axios from 'axios';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import FilteredList from './FilteredList';

const SearchSection = () => {
  const setItemList = useSetAtom(readWriteRecipesAtom);
  useEffect(() => {
    axios.get('/data.json')
      .then(({data}) => {
        setItemList(data);
      })
      .catch(() => {
        toast.error('Fail to load crafting items.', {
          id: 'fetchData',
        });
      });
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
      <QueryForm />
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
