import { createContext, ReactNode, useContext } from 'react';

interface FinderContextType {
  setEntity: (entity: EntityId) => void,
}

const FinderContext = createContext<FinderContextType | null>(null);

const useFinderContext = () => {
  const ctx = useContext(FinderContext);

  if (!ctx) {
    throw new Error('useFinderContext should be rendered under FinderContextProvider.')
  }

  return ctx;
};

const FinderContextProvider = ({children, setEntity}: {children?: ReactNode} & FinderContextType) => {

  return (
    <FinderContext.Provider value={{ setEntity }} children={children} />
  );
};

export { FinderContextProvider, useFinderContext };
