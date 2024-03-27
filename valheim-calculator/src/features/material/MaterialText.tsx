import { searchTxtAtom } from '@/shared/atoms';
import { Link, Typography } from '@mui/joy';
import { useSetAtom } from 'jotai';

interface Props {
  material: MaterialBaseType,
}

const MaterialText = ({material}: Props) => {
  const searchable = !!material.id;
  const setSearchTxt = useSetAtom(searchTxtAtom);

  if (searchable) {
    return (
      <Link onClick={() => setSearchTxt(material.title)}>{material.title}</Link>
    );
  }

  return (
    <Typography>{material.title}</Typography>
  );
};

export default MaterialText;
