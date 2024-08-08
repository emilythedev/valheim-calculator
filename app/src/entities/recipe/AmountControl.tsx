import AddButton from '@/shared/ui/AddButton';
import NumberStepper from '@/shared/ui/NumberStepper';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useRecipeContext } from './provider';

const AmountControl = () => {
  const { amount, setAmount } = useRecipeContext();

  if (amount === 0) {
    return (
      <AddButton onClick={() => setAmount(1)} aria-label="Add to shelf" />
    );
  }

  return (
    <label>
      <VisuallyHidden>Amount</VisuallyHidden>
      <NumberStepper min={0} value={amount} onValueChange={setAmount} />
    </label>
  );
};

export default AmountControl;
