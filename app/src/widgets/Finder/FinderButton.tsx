import { Button } from '@/shared/ui/button';
import { useSetAtom } from 'jotai';
import { Search } from 'lucide-react';
import { filterDialogOpenAtom } from './atom';

const FinderButton = () => {
  const setOpen = useSetAtom(filterDialogOpenAtom);

  return (
    <>
      <Button
        size="sm"
        variant="outline"
        className="flex items-center justify-start gap-4"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4 text-muted-foreground" />
        Search
      </Button>
    </>
  );
};

export default FinderButton;
