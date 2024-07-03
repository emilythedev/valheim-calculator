import { recipeAmountAtoms } from '@/shared/atoms';
import { useAtomValue } from 'jotai';
import { Check } from 'lucide-react';

const ShelfStatusText = ({recipe}: {recipe: RecipeKey}) => {
  const amount = useAtomValue(recipeAmountAtoms(recipe))

  if (amount === 0) return null;

  return (
    <div className="text-green-800 inline-flex items-center">
      <Check className="h-4 w-4 mr-1" />
      On Shelf
    </div>
  );
};

export default ShelfStatusText;
