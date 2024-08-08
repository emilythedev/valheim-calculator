import { Plus } from 'lucide-react';
import { ComponentPropsWithoutRef } from 'react';
import { Button } from './button';

const AddButton = ({ onClick, ...props }: ComponentPropsWithoutRef<typeof Button>) => {
  return (
    <Button size="icon-sm" onClick={onClick} {...props}>
      <Plus className="h-4 w-4" />
    </Button>
  );
};

export default AddButton;
