import { useEntityContext } from './provider';

const EntityName = () => {
  const { name } = useEntityContext();
  return (
    <span>{ name }</span>
  );
};

export default EntityName;
