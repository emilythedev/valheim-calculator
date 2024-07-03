import { getCraftableEntityList, getEntityMaxQuality } from '@/data';
import Quality from '@/entities/recipe/Quality';
import { recipeAmountAtoms } from '@/shared/atoms';
import { Button } from '@/shared/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/shared/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { useAtom } from 'jotai';
import { Search } from 'lucide-react';
import { useState } from 'react';

const entityList = getCraftableEntityList();

interface FilterSearchProps {
  value: EntityId,
  onValueChange: (value: EntityId) => void,
}

const FilterSearch = ({ value, onValueChange }: FilterSearchProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size="lg"
          variant="outline"
          role="combobox"
          aria-expanded={open}
        >
          {value ? value : 'Search an item'}
          <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="start">
        <Command
          className="rounded-lg border shadow-md"
        >
          <CommandInput placeholder="Type item name..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {
                entityList.map(({ key, label }) => (
                  <CommandItem
                    key={key}
                    value={key}
                    onSelect={(val) => {
                      onValueChange(val);
                      setOpen(false);
                    }}
                  >{ label }</CommandItem>
                ))
              }
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const QualityButton = ({ entity, quality }: RecipeKey) => {
  const [amount, setAmount] = useAtom(recipeAmountAtoms({ entity, quality }));
  return (
    <Button variant="outline" onClick={() => setAmount(amount + 1)}>
      <Quality value={quality} className="mr-2" />+1
    </Button>
  );
};

interface QualityListProps {
  entity: EntityId,
}

const QualityList = ({ entity }: QualityListProps) => {
  const maxQuality = getEntityMaxQuality(entity);
  const children = [];
  for (let i = 0; i < maxQuality; i++) {
    children.push((
      <QualityButton
        key={i}
        entity={entity}
        quality={i + 1}
      />
    ));
  }

  return (
    <>
      {children}
    </>
  );
};

const Finder = () => {
  const [value, setValue] = useState<EntityId>('');

  return (
    <>
      <FilterSearch value={value} onValueChange={setValue} />
      <div className="flex flex-row justify-stretch gap-2">
        <QualityList entity={value} />
      </div>
    </>
  );
};

export default Finder;
