import { readWishlistAtom } from '@/entities/item/atoms/wishlist';
import { List, Typography } from '@mui/joy';
import { listClasses } from '@mui/material/List';
import { useAtomValue } from 'jotai';
import ListItem from './ListItem';

const WishlistPanel = () => {
  const wishlist = useAtomValue(readWishlistAtom);

  return (
    <div data-textid="cy-wishlist">
      { wishlist.length > 0 ? (
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
        ) : (
          <Typography textAlign={'center'}>Add an item to get start.</Typography>
        )
      }
    </div>
  )
};

export default WishlistPanel;
