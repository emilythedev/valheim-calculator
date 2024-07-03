import { Typography } from '@mui/joy';

interface Props {
  item: IItemRecipeAtom,
}

const TitleText = ({ item }: Props) => {
  let title = item.title;
  if (item.maxQuality > 1) {
    title += ` [${item.qualityLevel}]`;
  }
  if (item.craftingAmount > 1) {
    title += ` x ${item.craftingAmount}`;
  }

  return (
    <Typography>{title}</Typography>
  );
};

export default TitleText;
