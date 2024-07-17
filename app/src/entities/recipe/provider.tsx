import { getEntityName, isEntityUpgradable, isExtendable } from '@/data';
import { recipeAmountAtoms } from '@/shared/atoms';
import { useAtom } from 'jotai';
import { createContext, ReactNode, useContext } from 'react';

interface RecipeContextType {
  entity: EntityId,
  quality: QualityLevel,
  name: string,
  upgradable: boolean,
  extendable: boolean,

  amount: number,
  setAmount: (amount: number) => void,
}

const RecipeContext = createContext<RecipeContextType>({
  entity: '',
  quality: 1,
  name: '',
  upgradable: false,
  extendable: false,

  amount: 0,
  setAmount: () => {},
});

interface ProviderProps {
  children?: ReactNode,
  entity: EntityId,
  quality: QualityLevel,
}

const useRecipeContext = () => {
  const ctx = useContext(RecipeContext);
  if (!ctx) {
    throw new Error('useRecipeContext should be rendered under RecipeContextProvider.')
  }
  return ctx;
};

const RecipeContextProvider = ({ entity, quality, children }: ProviderProps) => {
  const extendable = isExtendable(entity);
  const [amount, setAmount] = useAtom(recipeAmountAtoms({ entity, quality: !extendable ? quality : 1 }));
  const name = getEntityName(entity);
  const upgradable = isEntityUpgradable(entity);

  return (
    <RecipeContext.Provider value={{
      entity,
      quality,
      name,
      upgradable,
      extendable,
      amount,
      setAmount,
    }}>
      {children}
    </RecipeContext.Provider>
  );
};

export { RecipeContextProvider, useRecipeContext };
