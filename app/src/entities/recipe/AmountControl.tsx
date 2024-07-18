import AddButton from '@/shared/ui/AddButton';
import NumberStepper from '@/shared/ui/NumberStepper';
import { useRecipeContext } from './provider';

const AmountControl = () => {
  const { amount, setAmount } = useRecipeContext();

  if (amount === 0) {
    return (
      <AddButton onClick={() => setAmount(1)} />
    );
  }

  return (
    <NumberStepper min={0} value={amount} onChange={setAmount} />
  );
};

export default AmountControl;
