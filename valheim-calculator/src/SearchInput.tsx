import { Input } from '@mui/joy';
import { useAtom } from 'jotai';
import { searchTxtAtom } from './shared/atoms';

const SearchInput = () => {
  const [searchTxt, setSearchTxt] = useAtom(searchTxtAtom);
  return (
    <Input
      placeholder="Search by item name"
      variant="soft"
      value={searchTxt}
      onChange={(e) => setSearchTxt(e.target.value)}
    />
  );
};

export default SearchInput;
