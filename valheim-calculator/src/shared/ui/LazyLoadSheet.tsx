import { Sheet, SheetProps } from '@mui/joy';
import { UIEventHandler, useCallback } from 'react';

interface LazyLoadSheetProps extends Omit<SheetProps, 'component'> {
  onBottomReached: () => void,
}

const LazyLoadSheet = ({sx = {}, onBottomReached, ...props}: LazyLoadSheetProps) => {
  const onScroll: UIEventHandler<HTMLDivElement> = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target as HTMLDivElement;
    const reachBottom = scrollTop + clientHeight >= scrollHeight;

    if (reachBottom) {
      onBottomReached();
    }
  };

  return (
    <Sheet
      {...props}
      sx={{...sx, overflow: 'auto' }}
      onScroll={onScroll}
      component="div"
    />
  )
}

export default LazyLoadSheet
