import EntityName from '@/entities/entity/EntityName';
import { EntityRecipeContextProvider, useRecipeContext } from '@/entities/recipe/provider';
import Quality from '@/entities/recipe/Quality';
import { Button } from '@/shared/ui/button';
import { ScrollText } from 'lucide-react';
import { ReactNode } from 'react';

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
    <EntityRecipeContextProvider entity={entity} quality={quality}>
      <div className="entity-list-item max-sm:flex-wrap relative bg-secondary text-secondary-foreground">
        <EntityName className="max-sm:w-full" />
        <div className="flex items-center gap-4 max-sm:order-first max-sm:w-full">
          <QualityTag />
          <RecipeButton hide={hideRecipeButton} onClick={props.onViewRecipe} />
        </div>
        <span className="flex-1 max-sm:hidden"></span>
        {props.children}
      </div>
    </EntityRecipeContextProvider>
  );
};

export default RecipeListItem;
