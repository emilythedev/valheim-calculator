import { wishlistAmountAtomFamily } from '@/shared/atoms';
import StepperInput from '@/shared/ui/StepperInput';
import { Button } from '@mui/joy';
import { useAtom } from 'jotai';

interface Props {
  item: IItemRecipeAtom,
}

const AmountInput = ({ item }: Props) => {
  const [amount, setAmount] = useAtom(wishlistAmountAtomFamily(item.id));

  if (amount > 0) {
    return (
      <StepperInput
        value={amount}
        onChange={(value) => setAmount(value, item)}
      />
    );
  }

  return (
    <Button onClick={() => setAmount(1, item)}>Add</Button>
  );
}

export default AmountInput
