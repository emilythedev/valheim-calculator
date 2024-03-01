import { Link, Typography } from '@mui/joy';
import { useAtomValue, useSetAtom } from 'jotai';
import { useMemo } from 'react';
import { itemNamesAtom, searchTxtAtom } from './shared/atoms';

interface Props {
  name: string,
}

const MaterialText = ({name}: Props) => {
  const names = useAtomValue(itemNamesAtom);
  const searchable = useMemo(() => {
    return name && names.indexOf(name.toLowerCase()) !== -1;
  }, [name, names]);
  const setSearchTxt = useSetAtom(searchTxtAtom);

  if (searchable) {
    return (
      <Link onClick={() => setSearchTxt(name)}>{name}</Link>
    )
  }

  return (
    <Typography>{name}</Typography>
  )
}

export default MaterialText;
