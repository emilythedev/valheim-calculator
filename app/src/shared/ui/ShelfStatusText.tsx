import { Check } from 'lucide-react';

const ShelfStatusText = ({isOnShelf}: {isOnShelf: boolean}) => {
  if (!isOnShelf) return null;

  return (
    <span className="text-green-800">
      <Check className="h-3 w-3 mr-1" />
      On List
    </span>
  );
};

export default ShelfStatusText;
