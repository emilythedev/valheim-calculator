import EntityDetails from '@/widgets/EntityDetails';
import { FilterDialog, FinderButton, FinderContextProvider } from '@/widgets/Finder';
import { useState } from 'react';

const EntitySelector = () => {
  const [entity, setEntity] = useState<EntityId>('');

  return (
    <div className="flex flex-col space-y-4">
      <FinderContextProvider entity={entity} setEntity={setEntity}>
        <FinderButton />
        <EntityDetails entity={entity} onClear={() => setEntity('')} />
        <FilterDialog />
      </FinderContextProvider>
    </div>
  );
};

export default EntitySelector;
