import { useEntityContext } from './provider';

const EntityName = ({className}: {className?: string}) => {
  const { name } = useEntityContext();
  return (
    <span className={className}>{ name }</span>
  );
};

export default EntityName;
