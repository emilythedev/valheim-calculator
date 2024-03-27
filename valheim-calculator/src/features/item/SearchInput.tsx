import { searchTxtAtom } from '@/shared/atoms';
import CancelIcon from '@mui/icons-material/Cancel';
import { IconButton, Input } from '@mui/joy';
import { useAtom } from 'jotai';

const SearchInput = () => {
  const [searchTxt, setSearchTxt] = useAtom(searchTxtAtom);
  return (
    <Input
      placeholder="Search by item name"
      variant="soft"
      value={searchTxt}
      onChange={(e) => setSearchTxt(e.target.value)}
      endDecorator={searchTxt ? (
        <IconButton
          onClick={() => setSearchTxt('')}
        >
          <CancelIcon />
        </IconButton>
      ) : undefined}
    />
  );
};

export default SearchInput;
