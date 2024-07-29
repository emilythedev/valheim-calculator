import EntityDetails from '@/widgets/EntityDetails';
import { FilterDialog, FinderButton, FinderContextProvider } from '@/widgets/Finder';
import { useState } from 'react';

const EntitySelector = () => {
  const [entity, setEntity] = useState<EntityId>('');

  return (
    <FinderContextProvider entity={entity} setEntity={setEntity}>
      <FinderButton />
      <EntityDetails entity={entity} />
      <FilterDialog />
    </FinderContextProvider>
  );
};

export default EntitySelector;
