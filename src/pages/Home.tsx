import MenuHeader from "../components/menu/MenuHeader";
import CategoryFilter from "../components/menu/CategoryFilter";
import MenuGrid from "../components/menu/MenuGrid";
import ItemDetailModal from "../components/menu/ItemDetailModal";

const Home = () => {
  return (
    <div className="flex flex-col bg-gray-100 dark:bg-gray-950 transition-colors duration-300">
      {/* Top bar with category filter and search */}
      <div className="flex w-full">
        <CategoryFilter />
        <MenuHeader />
      </div>

      {/* Main content area with menu grid */}
      <main className="flex w-full">
        <MenuGrid />
      </main>

      {/* Modal for displaying item details (renders when item is selected) */}
      <ItemDetailModal />
    </div>
  );
};

export default Home;
