import { readWishlistAtom } from '@/entities/item/atoms/wishlist';
import { List } from '@mui/joy';
import { listClasses } from '@mui/material/List';
import { useAtomValue } from 'jotai';
import ListItem from './ListItem';

const WishlistPanel = () => {
  const wishlist = useAtomValue(readWishlistAtom);

  return (
    <div>
      <List
        sx={{
          [`& .${listClasses.root}`]: {
            marginLeft: '2rem',
          },
        }}
      >
        {wishlist.map((item) => {
          return (
            <ListItem key={`wl_${item.id}`} item={item} />
          );
        })}
      </List>
    </div>
  )
};

export default WishlistPanel;
