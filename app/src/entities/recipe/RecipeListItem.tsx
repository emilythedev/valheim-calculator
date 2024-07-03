import { getEntityName } from '@/data';
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
  quality: QualityLevel | null,
  hideRecipeButton?: boolean,
  onViewRecipe?: () => void,
  children?: ReactNode,
}

const RecipeListItem = ({ entity, quality, hideRecipeButton = false, ...props }: Props) => {
  return (
    <div className="px-4 py-2 flex flex-row items-center gap-4 bg-secondary text-secondary-foreground rounded-md text-sm">
      <EntityName entity={entity} />
      {quality && <Quality value={quality} />}
      {!hideRecipeButton && <RecipeButton onClick={props.onViewRecipe} />}
      <span className="flex-1"></span>
      {props.children}
    </div>
  )
};

export default RecipeListItem;
