import RecipeFinder from '@/features/recipes/Finder';
import RecipeShelf from '@/features/recipes/Shelf';

const Layout = () => {
  return (
    <div className="container min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col justify-center align-center">
        <RecipeFinder />
        <RecipeShelf />
      </div>
    </div>
  );
};

export default Layout;
