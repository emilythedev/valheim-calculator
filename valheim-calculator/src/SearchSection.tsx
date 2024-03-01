import { Sheet, Stack, Table } from '@mui/joy';
import list from '../public/data.json';
import ItemRow from './ItemRow';
import SearchInput from './SearchInput';

const SearchSection = () => {
  return (
    <Stack
      flexGrow={1}
      direction="column"
      justifyContent="flex-start"
      alignItems="stretch"
      spacing={4}
      my={4}
      minHeight={0}
    >
      <SearchInput />
      <Sheet sx={{ flexGrow: 1, overflow: 'auto' }}>
        <Table variant="plain" stickyHeader hoverRow>
          <thead>
            <tr>
              <th>Title</th>
              <th>Source</th>
              <th>Upgrades</th>
              <th>Materials</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item) => {
              return (<ItemRow key={`${item.title}_${item.itemLevel}`} item={item} />);
            })}
          </tbody>
        </Table>
      </Sheet>
    </Stack>
  );
};

export default SearchSection;
