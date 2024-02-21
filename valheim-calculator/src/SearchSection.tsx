import { Input, Sheet, Stack, Table } from '@mui/joy';
import ItemRow from './ItemRow';

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
      <Input placeholder="Search by item name" variant="soft" />
      <Sheet sx={{ flexGrow: 1, overflow: 'auto' }}>
        <Table variant="plain" stickyHeader>
          <thead>
            <tr>
              <th>Title</th>
              <th>Source</th>
              <th>Upgrades</th>
              <th>Materials</th>
            </tr>
          </thead>
          <tbody>

          </tbody>
        </Table>
      </Sheet>
    </Stack>
  );
};

export default SearchSection;
