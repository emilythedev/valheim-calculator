import { Button } from '@/shared/ui/button';
import { ScrollText } from 'lucide-react';
import { ReactNode } from 'react';
import Quality from './Quality';
import { RecipeContextProvider, useRecipeContext } from './provider';

const RecipeButton = ({hide = false, onClick}: {hide?: boolean, onClick?: () => void}) => {
  if (hide) {
    return null;
  }

  return (
    <Button variant="ghost" size="icon-sm" onClick={onClick} aria-label="View recipe details">
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

const QualityTag = () => {
  const { upgradable, quality } = useRecipeContext();
  if (quality === 1 && !upgradable) {
    return null;
  }

  return (<Quality value={quality} />);
};

interface Props {
  entity: EntityId,
  quality?: QualityLevel,
  hideRecipeButton?: boolean,
  onViewRecipe?: () => void,
  children?: ReactNode,
}

const RecipeListItem = ({ entity, quality = 1, hideRecipeButton = false, ...props }: Props) => {
  return (
    <RecipeContextProvider entity={entity} quality={quality}>
      <div className="entity-list-item bg-secondary text-secondary-foreground">
        <EntityName />
        <QualityTag />
        <RecipeButton hide={hideRecipeButton} onClick={props.onViewRecipe} />
        <span className="flex-1"></span>
        {props.children}
      </div>
    </RecipeContextProvider>
  );
};

export default RecipeListItem;
