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
      data-testid={`cy-select-${name}`}
    >
      <Option data-testid="cy-option-titleType" value="title">Title</Option>
      <Option data-testid="cy-option-upgradesType" value="upgrades">Upgrades of</Option>
    </Select>
  );
};

export default TypeSelector;
