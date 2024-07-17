import { getEntityName, isEntityUpgradable } from '@/data';
import { Button } from '@/shared/ui/button';
import { ScrollText } from 'lucide-react';
import { ReactNode } from 'react';
import Quality from '../recipe/Quality';

const RecipeButton = ({onClick}: {onClick?: () => void}) => {
  return (
    <Button variant="ghost" size="icon-sm" onClick={onClick}>
      <ScrollText className="h-4 w-4" />
    </Button>
  );
};

const EntityName = ({ entity }: { entity: EntityId }) => {
  const name = getEntityName(entity);
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
    <div className="entity-list-item bg-secondary text-secondary-foreground">
      <EntityName entity={entity} />
      {!(!quality || (quality === 1 && !entityUpgradable)) && <Quality value={quality} />}
      {!hideRecipeButton && <RecipeButton onClick={props.onViewRecipe} />}
      <span className="flex-1"></span>
      {props.children}
    </div>
  );
};

export default RecipeListItem;
