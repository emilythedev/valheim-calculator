import RecipeFinder from '@/features/recipes/Finder';

const Layout = () => {
  return (
    <div className="container min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col justify-center align-center">
        <RecipeFinder />
      </div>
    </div>
  );
};

export default Layout;
