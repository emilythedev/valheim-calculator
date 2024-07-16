import { getExtensions, isEntityUpgradable, isExtendable } from '@/data';
import { recipeAmountAtoms } from '@/shared/atoms';
import { Button } from '@/shared/ui/button';
import { atom, useAtom, useAtomValue } from 'jotai';
import { sum } from 'lodash-es';
import { Check } from 'lucide-react';
import { useMemo } from 'react';

const useExtensionCountOnShelf = (extensions: Extensions) => {
  const countAtom = useMemo(() => {
    return atom(get => {
      return sum(extensions.map((entity) => get(recipeAmountAtoms({ entity, quality: 1 }))));
    });
  }, [extensions]);

  return useAtomValue(countAtom);
};

const MissingExtensionsText = ({ entity, quality }: EntityQualityProps) => {
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

const AddBtn = ({onClick}: {onClick?: () => void}) => {
  return (
    <Button
      size="sm"
      onClick={onClick}
      aria-label="Add to shelf"
    >+1</Button>
  );
};

const ShelfStatusText = ({recipe, allowAdd = false}: {recipe: RecipeKey, allowAdd?: boolean}) => {
  const { entity, quality } = recipe;
  const isUpgradable = isEntityUpgradable(entity);

  const [amount, setAmount] = useAtom(recipeAmountAtoms({ entity, quality: isUpgradable ? quality : 1 }));
  if (amount === 0) {
    return allowAdd ?
      (<AddBtn onClick={() => setAmount(1)} />) :
      null;
  }

  return quality > 1 && isExtendable(entity) &&
    (<MissingExtensionsText entity={entity} quality={quality} />) ||
    (<OnShefText />);
};

export default ShelfStatusText;
