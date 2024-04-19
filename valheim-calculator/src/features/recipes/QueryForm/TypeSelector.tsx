import { querySelectInputAtom } from '@/entities/item/atoms/recipes';
import { Option, Select } from '@mui/joy';
import { useAtom } from 'jotai';
import { SyntheticEvent } from 'react';

interface Props {
  name: string,
}
const TypeSelector = ({name}: Props) => {
  const [selectValue, setSelectValue] = useAtom(querySelectInputAtom);

  const handleChange = (e: SyntheticEvent | null, newValue: string | null) => {
    setSelectValue(!newValue ? 'title' : newValue as FilterType);
  };

  return (
    <Select
      name={name}
      defaultValue="title"
      value={selectValue}
      onChange={handleChange}
      variant="soft"
    >
      <Option value="title">Title</Option>
      <Option value="upgrades">Upgrades of</Option>
    </Select>
  );
};

export default TypeSelector;
