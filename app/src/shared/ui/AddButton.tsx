import { Plus } from 'lucide-react';
import { Button } from './button';

const AddButton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Button size="icon-sm" onClick={onClick} aria-label="Add">
      <Plus className="h-4 w-4" />
    </Button>
  );
};

export default AddButton;
