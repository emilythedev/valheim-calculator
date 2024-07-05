import RecipeFinder from '@/features/recipes/Finder';
import RecipeDetailsDialog from '@/features/recipes/RecipeDetailsDialog';
import RecipeShelf from '@/features/recipes/Shelf';
import Summary from '@/features/recipes/Summary';

const Layout = () => {
  return (
    <div className="container min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col align-center space-y-12 pt-16">
        <RecipeFinder />
        <RecipeShelf />
        <Summary />
      </div>
      <RecipeDetailsDialog />
    </div>
  );
};

export default Layout;
