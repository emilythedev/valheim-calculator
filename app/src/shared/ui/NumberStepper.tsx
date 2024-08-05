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
      role="spinbutton"
      aria-valuemin={0}
      aria-valuemax={max}
      className="inline-flex flex-row"
      {...divProps}
    >
      <Button
        data-testid="stepper-dec"
        variant="outline"
        size="icon-sm"
        onClick={() => onValueChange(props.value - step)}
        className="rounded-r-none"
        aria-label="Decrease"
      >
        <Minus className="h-4 w-4" />
      </Button>
      <Input
        data-testid="stepper"
        value={props.value}
        onChange={(e) => onValueChange(parseInt(e.target.value))}
        className="text-center w-12 rounded-none border-x-0 h-9"
        aria-label={divProps['aria-label']}
      />
      <Button
        data-testid="stepper-inc"
        variant="default"
        size="icon-sm"
        onClick={() => onValueChange(props.value + step)}
        className="rounded-l-none"
        aria-label="Increase"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default NumberStepper;
