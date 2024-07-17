import { isEntityUpgradable } from '@/data';
import { Button } from '@/shared/ui/button';
import { ScrollText } from 'lucide-react';
import { ReactNode } from 'react';
import Quality from './Quality';
import { RecipeContextProvider, useRecipeContext } from './provider';

const RecipeButton = ({onClick}: {onClick?: () => void}) => {
  return (
    <Button variant="ghost" size="icon-sm" onClick={onClick}>
      <ScrollText className="h-4 w-4" />
    </Button>
  );
};

const EntityName = () => {
  const { name } = useRecipeContext();
  return (
    <span>{ name }</span>
  );
};

interface Props {
  entity: EntityId,
  quality?: QualityLevel,
  hideRecipeButton?: boolean,
  onViewRecipe?: () => void,
  children?: ReactNode,
}

const RecipeListItem = ({ entity, quality = 1, hideRecipeButton = false, ...props }: Props) => {
  const entityUpgradable = isEntityUpgradable(entity);

  return (
    <RecipeContextProvider entity={entity} quality={quality}>
      <div className="entity-list-item bg-secondary text-secondary-foreground">
        <EntityName />
        {!(!quality || (quality === 1 && !entityUpgradable)) && <Quality value={quality} />}
        {!hideRecipeButton && <RecipeButton onClick={props.onViewRecipe} />}
        <span className="flex-1"></span>
        {props.children}
      </div>
    </RecipeContextProvider>
  );
};

export default RecipeListItem;
