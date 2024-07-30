import EntitySelector from '@/features/entity/EntitySelector';
import RecipeDetailsDialog from '@/features/recipes/RecipeDetailsDialog';
import RecipeShelf from '@/features/recipes/Shelf';
import Summary from '@/features/recipes/Summary';

const Layout = () => {
  return (
    <>
      <div className="container pb-16 pt-16">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col align-center gap-12">
            <EntitySelector />
            <RecipeShelf />
          </div>
          <Summary />
        </div>
      </div>
      <RecipeDetailsDialog />
    </>
  );
};

export default Layout;
