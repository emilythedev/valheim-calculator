import { EntityContextProvider, EntityContextType, useEntityContext } from '@/entities/entity/provider';
import { recipeAmountAtoms } from '@/shared/atoms';
import { useAtom } from 'jotai';
import { createContext, ReactNode, useContext } from 'react';

interface RecipeContextType extends EntityContextType {
  quality: QualityLevel,

  amount: number,
  setAmount: (amount: number) => void,
}

const RecipeContext = createContext<RecipeContextType | null>(null);

const useRecipeContext = () => {
  const ctx = useContext(RecipeContext);
  if (!ctx) {
    throw new Error('useRecipeContext should be rendered under RecipeContextProvider.')
  }
  return ctx;
};

interface RecipeContextProviderProps {
  children?: ReactNode,
  quality: QualityLevel,
}

const RecipeContextProvider = ({ quality, children }: RecipeContextProviderProps) => {
  const entityInfo = useEntityContext();
  const [amount, setAmount] = useAtom(recipeAmountAtoms({
    entity: entityInfo.entity,
    quality: !entityInfo.extendable ? quality : 1
  }));

  return (
    <RecipeContext.Provider value={{
      ...entityInfo,
      quality,
      amount,
      setAmount,
    }}>
      {children}
    </RecipeContext.Provider>
  );
};

interface EntityRecipeContextProviderProps {
  children?: ReactNode,
  entity: EntityId,
  quality: QualityLevel,
}

const EntityRecipeContextProvider = ({entity, ...props}: EntityRecipeContextProviderProps) => {
  return (
    <EntityContextProvider entity={entity}>
      <RecipeContextProvider {...props} />
    </EntityContextProvider>
  );
};

export { EntityRecipeContextProvider, RecipeContextProvider, useRecipeContext };
