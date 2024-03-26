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
  return (
    <Input
      type="number"
      value={props.value}
      onChange={(e) => props.onChange && props.onChange(parseInt(e.target.value))}
      startDecorator={(
        <IconButton
          onClick={() => {
            props.onChange && props.onChange(Math.max(props.value - step, min));
          }}
        ><RemoveIcon /></IconButton>
      )}
      endDecorator={(
        <IconButton
          onClick={() => {
            props.onChange && props.onChange(Math.min(props.value + step, max));
          }}
        ><AddIcon /></IconButton>
      )}
      sx={{ width: '8em' }}
    />
  )
}

export default StepperInput
