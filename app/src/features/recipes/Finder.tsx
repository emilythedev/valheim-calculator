import { categories, getCategoryEntities, getCraftableEntityList } from '@/data';
import EntityName from '@/entities/entity/EntityName';
import { EntityContextProvider } from '@/entities/entity/provider';
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
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { toPairs } from 'lodash-es';
import { Search } from 'lucide-react';

const entityAtom = atom<EntityId>('');
const filterDialogOpenAtom = atom<boolean>(false);
const filterValueAtom = atom<string>('');
const categoryFilterAtom = atom<string>('');

const entityList = getCraftableEntityList();

const FilterSearch = () => {
  const setOpen = useSetAtom(filterDialogOpenAtom);

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
      <FilterDialog />
    </>
  );
};

const FilterInput = () => {
  const [value, setValue] = useAtom(filterValueAtom);

  return (
    <CommandInput
      placeholder="Type item name..."
      value={value}
      onValueChange={setValue}
    />
  );
};

const FilterDialog = () => {
  const [open, setOpen] = useAtom(filterDialogOpenAtom);

  return (
    <CommandDialog
      title="Search"
      description="Find and select item"
      open={open}
      onOpenChange={setOpen}
    >
      <Command className="border rounded-lg shadow-md">
        <SelectedCategory />
        <FilterInput />

        <CategoryList />
        <FilterList />
      </Command>
    </CommandDialog>
  );
};

const SelectedCategory = () => {
  const [filterVal, setFilter] = useAtom(categoryFilterAtom);
  if (!filterVal) return null;
  return (
    <div className="flex">
      <Button size="sm" className="text-xs" onClick={() => setFilter('')}>{ filterVal }</Button>
    </div>
  );
};

const CategoryButton = ({ parent, id }: { parent: CategoryId, id: CategoryId }) => {
  const [filterVal, setFilter] = useAtom(categoryFilterAtom);
  if (filterVal !== parent) return null;

  return (
    <Button variant="outline" onClick={() => setFilter(id)}>{ id }</Button>
  );
};

const CategoryList = () => {
  return (
    <>
      <p className="mt-4 px-4 text-base text-muted-foreground">...or select a category:</p>
      <div className="flex items-center gap-1.5 flex-wrap py-4 px-4">
        {toPairs(categories).map(([parent, list]) => {
          return list.map((cat) => (
            <CategoryButton key={cat} parent={parent} id={cat} />
          ));
        }).flat()}
      </div>
    </>
  );
};

const FilterList = () => {
  const setOpen = useSetAtom(filterDialogOpenAtom);
  const setEntity = useSetAtom(entityAtom);
  const filterValue = useAtomValue(filterValueAtom);
  const categoryFilter = useAtomValue(categoryFilterAtom);

  const list = categoryFilter ?
    getCategoryEntities(categoryFilter) :
    (filterValue ? entityList : [] as string[]);

  return (
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup>
        {
          list.map((entity) => (
            <CommandItem
              key={entity}
              value={entity}
              onSelect={(val) => {
                setEntity(val);
                setOpen(false);
              }}
            >
              <EntityContextProvider entity={entity}>
                <EntityName />
              </EntityContextProvider>
            </CommandItem>
          ))
        }
      </CommandGroup>
    </CommandList>
  );
};

const Finder = () => {
  const value = useAtomValue(entityAtom);

  return (
    <>
      <FilterSearch />
      <EntityDetails entity={value} />
    </>
  );
};

export default Finder;
