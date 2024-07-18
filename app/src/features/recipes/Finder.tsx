import { getCraftableEntityList } from '@/data';
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
import EntityDetails from '@/widgets/EntityDetails';
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

const Finder = () => {
  const [value, setValue] = useState<EntityId>('');

  return (
    <>
      <FilterSearch value={value} onValueChange={setValue} />
      <EntityDetails entity={value} />
    </>
  );
};

export default Finder;
