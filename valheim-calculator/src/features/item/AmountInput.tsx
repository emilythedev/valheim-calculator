import { wishlistAmountAtomFamily } from '@/entities/item/atoms/wishlist';
import StepperInput from '@/shared/ui/StepperInput';
import AddIcon from '@mui/icons-material/Add';
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
    <Button
      data-testid="cy-btn-addItem"
      onClick={() => setAmount(1, item)}
      aria-label="Add to wishlist"
    >
      <AddIcon />
    </Button>
  );
}

export default AmountInput
