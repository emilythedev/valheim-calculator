import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { omit } from 'lodash-es';
import { Minus, Plus } from 'lucide-react';
import { HTMLAttributes } from 'react';
import { Button } from './button';
import { Input } from './input';

interface Props {
  value: number,
  onValueChange?: (value: number) => void,
  step?: number,
  min?: number,
  max?: number,
}

const NumberStepper = ({step = 1, min = 0, max = 999, ...props}: Props & HTMLAttributes<HTMLDivElement>) => {
  const onValueChange = (value: number) => {
    if (!props.onValueChange || isNaN(value)) return;

    value = Math.max(Math.min(value, max), min);
    if (value !== props.value) {
      props.onValueChange(value);
    }
  };

  const divProps = omit(props, ['onValueChange', 'value']);

  return (
    <div
      {...divProps}
      role="spinbutton"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={props.value}
      className="inline-flex flex-row"
    >
      <Input
        value={props.value}
        onChange={(e) => onValueChange(parseInt(e.target.value))}
        className="text-center w-12 rounded-none border-x-0 h-9"
      />
      <Button
        variant="outline"
        size="icon-sm"
        onClick={() => onValueChange(props.value - step)}
        className="rounded-r-none -order-1"
      >
        <Minus className="h-4 w-4" aria-hidden />
        <VisuallyHidden>Decrease</VisuallyHidden>
      </Button>
      <Button
        variant="default"
        size="icon-sm"
        onClick={() => onValueChange(props.value + step)}
        className="rounded-l-none"
      >
        <Plus className="h-4 w-4" aria-hidden />
        <VisuallyHidden>Increase</VisuallyHidden>
      </Button>
    </div>
  );
};

export default NumberStepper;
