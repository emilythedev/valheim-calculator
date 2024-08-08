import { getEntityName, isEntityUpgradable, isExtendable } from '@/data';
import { createContext, ReactNode, useContext } from 'react';

interface EntityContextType {
  entity: EntityId,
  name: string,
  upgradable: boolean,
  extendable: boolean,
}

const EntityContext = createContext<EntityContextType | null>(null);

const useEntityContext = () => {
  const ctx = useContext(EntityContext);
  if (!ctx) {
    throw new Error('useEntityContext should be rendered under EntityContextProvider.')
  }
  return ctx;
};

interface ProviderProps {
  children?: ReactNode,
  entity: EntityId,
}

const EntityContextProvider = ({ entity, children }: ProviderProps) => {
  const extendable = isExtendable(entity);
  const name = getEntityName(entity);
  const upgradable = isEntityUpgradable(entity);

  return (
    <EntityContext.Provider value={{
      entity,
      name,
      upgradable,
      extendable,
    }}>
      {children}
    </EntityContext.Provider>
  );
};

export { EntityContextProvider, useEntityContext };
export type { EntityContextType };
