import EntitySelector from '@/features/entity/EntitySelector';
import RecipeDetailsDialog from '@/features/recipes/RecipeDetailsDialog';
import RecipeShelf from '@/features/recipes/Shelf';
import Summary from '@/features/recipes/Summary';
import { shelfEmptyAtom } from '@/shared/atoms';
import { useAtomValue } from 'jotai';

const Layout = () => {
  const shelfEmpty = useAtomValue(shelfEmptyAtom);

  return (
    <>
      <div className="container pb-16 pt-16">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col align-center gap-12">
            <EntitySelector />
            {!shelfEmpty && <RecipeShelf />}
          </div>
          {!shelfEmpty && <Summary />}
        </div>
      </div>
      <RecipeDetailsDialog />
    </>
  );
};

export default Layout;
