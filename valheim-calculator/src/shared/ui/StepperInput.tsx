import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { IconButton, Input } from '@mui/joy';

interface Props {
  value: number,
  onChange?: (value: number) => void,
  step?: number,
  min?: number,
  max?: number,
}

const StepperInput = ({step = 1, min = 0, max = Number.POSITIVE_INFINITY, ...props}: Props) => {
  const onChange = (value: number) => {
    if (!props.onChange || isNaN(value)) return;

    value = Math.max(Math.min(value, max), min);
    if (value !== props.value) {
      props.onChange(value);
    }
  };

  return (
    <Input
      data-testid="cy-stepper"
      value={props.value}
      onChange={(e) => onChange(parseInt(e.target.value))}
      startDecorator={(
        <IconButton
          data-testid="cy-stepper-dec"
          onClick={() => onChange(props.value - step)}
        ><RemoveIcon /></IconButton>
      )}
      endDecorator={(
        <IconButton
          data-testid="cy-stepper-inc"
          onClick={() => onChange(props.value + step)}
        ><AddIcon /></IconButton>
      )}
      sx={{
        display: 'inline-flex',

        '& > input': {
          width: '3em',
          textAlign: 'center',
        },
      }}
    />
  )
}

export default StepperInput
