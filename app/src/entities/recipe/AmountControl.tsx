import AddButton from '@/shared/ui/AddButton';
import NumberStepper from '@/shared/ui/NumberStepper';
import { useRecipeContext } from './provider';

const AmountControl = () => {
  const { amount, setAmount } = useRecipeContext();

  if (amount === 0) {
    return (
      <AddButton onClick={() => setAmount(1)} aria-label="Add to shelf" />
    );
  }

  return (
    <NumberStepper aria-label="Amount" min={0} value={amount} onValueChange={setAmount} />
  );
};

export default AmountControl;
