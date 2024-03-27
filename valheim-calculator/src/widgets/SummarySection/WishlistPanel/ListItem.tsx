import SourceText from '@/entities/item/ui/SourceText';
import TitleText from '@/entities/item/ui/TitleText';
import AmountInput from '@/features/item/AmountInput';
import MaterialText from '@/features/material/MaterialText';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HardwareIcon from '@mui/icons-material/Hardware';
import { ListItem as JoyListItem, List, ListItemDecorator, Typography } from '@mui/joy';
import { useState } from 'react';

interface Props {
  item: IItemRecipeAtom,
}

const ListItem = ({ item }: Props) => {
  const [open, setOpen] = useState(true);

  return (
    <JoyListItem
      nested
    >
      <JoyListItem
        onClick={() => setOpen(o => !o)}
        sx={(theme) => ({
          cursor: 'pointer',
          '&:hover': theme.variants.plainHover.neutral,
        })}
      >
        <ListItemDecorator><ExpandMoreIcon sx={{ transform: open ? 'initial' : 'rotate(-90deg)' }}/></ListItemDecorator>
        <Typography><TitleText item={item} /></Typography>
        <span style={{ flex: '1 0 0' }}></span>
        <span onClick={(e) => e.stopPropagation()}>
          <AmountInput item={item} />
        </span>
      </JoyListItem>
      {open &&
        <List>
          {item.source && item.source.map((material) => {
            return (
              <JoyListItem key={`wl_${item.id}_${material.title}`}>
                <ListItemDecorator><HardwareIcon /></ListItemDecorator>
                <SourceText source={material} craftingLevel={item.craftingLevel} />
              </JoyListItem>
            );
          })}
          {item.materials.map((material) => {
            return (
              <JoyListItem key={`wl_${item.id}_${material.title}`}>
                <Typography>
                  <MaterialText material={material}></MaterialText> x{material.quantity}
                </Typography>
              </JoyListItem>
            );
          })}
        </List>
      }
    </JoyListItem>
  )
}

export default ListItem
