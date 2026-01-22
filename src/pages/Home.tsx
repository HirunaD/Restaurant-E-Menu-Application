import { MenuProvider } from "../context/MenuContext";
import MenuHeader from "../components/menu/MenuHeader";
import CategoryFilter from "../components/menu/CategoryFilter";
import MenuGrid from "../components/menu/MenuGrid";
import ItemDetailModal from "../components/menu/ItemDetailModal";

const Home = () => {
  return (
    <MenuProvider>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex w-full">
          <CategoryFilter />
          <MenuHeader />
        </div>

        <main className="flex-1">
          <MenuGrid />
        </main>

        <ItemDetailModal />
      </div>
    </MenuProvider>
  );
};

export default Home;
