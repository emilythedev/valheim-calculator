import { getExtensions } from '@/data';
import { recipeAmountAtoms } from '@/shared/atoms';
import AddButton from '@/shared/ui/AddButton';
import { atom, useAtomValue } from 'jotai';
import { sum } from 'lodash-es';
import { Check } from 'lucide-react';
import { useMemo } from 'react';
import { useRecipeContext } from './provider';

const useExtensionCountOnShelf = (extensions: Extensions) => {
  const countAtom = useMemo(() => {
    return atom(get => {
      return sum(extensions.map((entity) => get(recipeAmountAtoms({ entity, quality: 1 }))));
    });
  }, [extensions]);

  return useAtomValue(countAtom);
};

const MissingExtensionsText = () => {
  const { entity, quality } = useRecipeContext();
  const extCount = useExtensionCountOnShelf(getExtensions(entity));
  if ((quality - 1) <= extCount) return (<OnShefText />);

  return (
    <span className="text-amber-500 italic">
      Missing Extensions
    </span>
  );
};

const OnShefText = () => {
  return (
    <div className="text-green-800 inline-flex items-center italic">
      <Check className="h-4 w-4 mr-1" />
      On Shelf
    </div>
  );
};

const ShelfStatusText = ({allowAdd = false}: {allowAdd?: boolean}) => {
  const {
    quality,
    extendable,
    amount,
    setAmount,
  } = useRecipeContext();

  if (amount === 0) {
    return allowAdd ?
      (<AddButton aria-label="Add to shelf" onClick={() => setAmount(1)} />) :
      null;
  }

  return quality > 1 && extendable &&
    (<MissingExtensionsText />) ||
    (<OnShefText />);
};

export default ShelfStatusText;
