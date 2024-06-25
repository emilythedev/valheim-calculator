import { getCraftableEntityList, getEntityMaxQuality } from '@/data';
import Quality from '@/entities/recipe/Quality';
import { Button } from '@/shared/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/shared/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
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

interface QualityButtonProps {
  quality: number,
  onClick: (quality: number) => void,
}

const QualityButton = ({ quality, onClick }: QualityButtonProps) => {
  return (
    <Button variant="outline" onClick={() => onClick(quality)}>
      <Quality value={quality} className="mr-2" />+1
    </Button>
  )
};

interface QualityListProps {
  value: EntityId,
  onAdd : (quality: number) => void,
}

const QualityList = ({ value, onAdd }: QualityListProps) => {
  const maxQuality = getEntityMaxQuality(value);
  const children = [];
  for (let i = 0; i < maxQuality; i++) {
    children.push((
      <QualityButton
        key={i}
        quality={i + 1}
        onClick={onAdd}
      />
    ))
  }

  return (
    <>
      {children}
    </>
  );
};

interface FinderProps {
  onRecipeSelect?: (id: EntityId, quality: number) => void,
}

const Finder = ({ onRecipeSelect }: FinderProps) => {
  const [value, setValue] = useState<EntityId>('');
  const handleAdd = (quality: number) => {
    onRecipeSelect && onRecipeSelect(value, quality);
  }

  return (
    <>
      <FilterSearch value={value} onValueChange={setValue} />
      <div className="flex flex-row justify-stretch gap-2">
        <QualityList value={value} onAdd={handleAdd} />
      </div>
    </>
  );
};

export default Finder;
