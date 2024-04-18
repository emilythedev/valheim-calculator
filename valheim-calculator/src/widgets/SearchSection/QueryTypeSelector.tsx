import { queryTypeAtom } from '@/entities/item/atoms/recipes';
import { Option, Select } from '@mui/joy';
import { useAtom } from 'jotai';
import { SyntheticEvent } from 'react';

const QueryTypeSelector = () => {
  const [queryType, setQueryType] = useAtom(queryTypeAtom);

  const handleChange = (e: SyntheticEvent | null, newValue: string | null) => {
    setQueryType(!newValue ? 'title' : newValue as FilterType);
  };

  return (
    <Select
      defaultValue="title"
      value={queryType}
      onChange={handleChange}
    >
      <Option value="title">Title</Option>
      <Option value="upgrades">Upgrades</Option>
    </Select>
  );
};

export default QueryTypeSelector;
