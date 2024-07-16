import { getEntityName, isEntityCraftable } from '@/data';
import { recipeAmountAtoms } from '@/shared/atoms';
import { Button } from '@/shared/ui/button';
import KeyValueList from '@/shared/ui/KeyValueList';
import NumberStepper from '@/shared/ui/NumberStepper';
import { useAtom } from 'jotai';
import { orderBy } from 'lodash-es';

interface ListItemProps {
  entity: EntityId,
  amount: number,
}

const AmountControl = ({recipe}: {recipe: RecipeKey}) => {
  const [amount, setAmount] = useAtom(recipeAmountAtoms(recipe));

  if (amount === 0) {
    return (
      <Button size="sm" onClick={() => setAmount(1)}>+1</Button>
    );
  }

  return (
    <NumberStepper min={0} value={amount} onChange={setAmount} />
  );
};

const ListItem = ({ entity, amount }: ListItemProps) => {
  const name = getEntityName(entity);
  const craftable = isEntityCraftable(entity);

  return (
    <>
      <div className="text-center px-2 py-2">{ amount }</div>
      <div className={`entity-list-item justify-between ${craftable ? 'bg-secondary text-secondary-foreground' : ''}`}>
        <span>{ name }</span>
        {craftable && <AmountControl recipe={{ entity: entity, quality: 1 }} />}
      </div>
    </>
  );
};

const sort = (pairs: [string, number][]) => {
  return orderBy(pairs, ([entity]) => getEntityName(entity), 'asc');
};

const MaterialList = ({ materials }: { materials: RecipeMaterials }) => {
  return (
    <KeyValueList
      list={materials}
      className="text-sm grid gap-2 items-center"
      style={{ gridTemplateColumns: 'max-content 1fr' }}
      item={(entity, amount: number) => (
        <ListItem key={entity} entity={entity} amount={amount} />
      )}
      sort={sort}
    />
  );
};

export default MaterialList;
