import { Sheet, SheetProps } from '@mui/joy';
import { UIEventHandler, forwardRef, useImperativeHandle, useRef } from 'react';

interface LazyLoadSheetProps extends Omit<SheetProps, 'component'> {
  onBottomReached: () => void,
}

interface LazyLoadSheetHandle {
  scrollToTop: () => void,
}

const LazyLoadSheet = forwardRef<LazyLoadSheetHandle, LazyLoadSheetProps>(({sx = {}, onBottomReached, ...props}, ref) => {
  const divRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    scrollToTop: () => {
      if (!divRef.current) return;

      divRef.current.scrollTop = 0;
    },
  }));

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
      ref={divRef}
      sx={{...sx, overflow: 'auto' }}
      onScroll={onScroll}
      component="div"
    />
  )
});

export default LazyLoadSheet
export type { LazyLoadSheetHandle };
