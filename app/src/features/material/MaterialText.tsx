import { writeQueryFormAtom } from '@/entities/item/atoms/recipes';
import { Link, Typography } from '@mui/joy';
import { useSetAtom } from 'jotai';

interface Props {
  material: IMaterial,
}

const MaterialText = ({material}: Props) => {
  const searchable = !!material.id;
  const setQueryForm = useSetAtom(writeQueryFormAtom);

  if (searchable) {
    return (
      <Link onClick={() => setQueryForm({
        key: 'id',
        value: [material.id],
        inputText: material.title,
      })}>{material.title}</Link>
    );
  }

  return (
    <Typography>{material.title}</Typography>
  );
};

export default MaterialText;
