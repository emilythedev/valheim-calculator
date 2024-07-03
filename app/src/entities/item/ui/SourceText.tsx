import MaterialText from '@/features/material/MaterialText';
import { Typography } from '@mui/joy';

interface Props {
  source: IMaterial,
  craftingLevel: null | number,
}

const SourceText = ({ source, craftingLevel }: Props) => {
  return (
    <Typography>
      <MaterialText material={source} />
      {craftingLevel && craftingLevel >= 1 && ` [${craftingLevel}]`}
    </Typography>
  );
};

export default SourceText;
