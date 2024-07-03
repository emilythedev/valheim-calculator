import { Minus, Plus } from 'lucide-react';
import { Button } from './button';
import { Input } from './input';

interface Props {
  value: number,
  onChange?: (value: number) => void,
  step?: number,
  min?: number,
  max?: number,
}

const NumberStepper = ({step = 1, min = 0, max = Number.POSITIVE_INFINITY, ...props}: Props) => {
  const onChange = (value: number) => {
    if (!props.onChange || isNaN(value)) return;

    value = Math.max(Math.min(value, max), min);
    if (value !== props.value) {
      props.onChange(value);
    }
  };

  return (
    <div className="inline-flex flex-row">
      <Button
        data-testid="stepper-dec"
        variant="secondary"
        size="icon"
        onClick={() => onChange(props.value - step)}
        className="rounded-r-none"
      >
        <Minus className="h-4 w-4" />
      </Button>
      <Input
        data-testid="stepper"
        value={props.value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="text-center w-12 rounded-none border-x-0"
      />
      <Button
        data-testid="stepper-inc"
        variant="default"
        size="icon"
        onClick={() => onChange(props.value + step)}
        className="rounded-l-none"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  )
};

export default NumberStepper;
