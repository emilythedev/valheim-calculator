import { getCraftableEntityList } from '@/data';
import { Button } from '@/shared/ui/button';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/shared/ui/command';
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
    <>
      <Button
        size="sm"
        variant="outline"
        className="flex items-center justify-start gap-4"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4 text-muted-foreground" />
        Search
      </Button>
      <CommandDialog
        title="Search"
        description="Find and select item"
        open={open}
        onOpenChange={setOpen}
      >
        <Command className="border rounded-lg shadow-md">
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
      </CommandDialog>
    </>
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
