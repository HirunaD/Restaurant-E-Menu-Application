import { MenuProvider } from "../context/MenuContext";
import MenuHeader from "../components/menu/MenuHeader";
import CategoryFilter from "../components/menu/CategoryFilter";
import MenuGrid from "../components/menu/MenuGrid";
import ItemDetailModal from "../components/menu/ItemDetailModal";

/**
 * Home Page Component
 * 
 * Main landing page displaying the restaurant menu with:
 * - Category filtering sidebar
 * - Search functionality in header
 * - Responsive grid of menu items
 * - Modal for item details and customization
 * 
 * Wrapped in MenuProvider for menu state management
 */
const Home = () => {
  return (
    <MenuProvider>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
        {/* Top bar with category filter and search */}
        <div className="max-w-7xl mx-auto flex w-full">
          <CategoryFilter />
          <MenuHeader />
        </div>

        {/* Main content area with menu grid */}
        <main className="flex-1">
          <MenuGrid />
        </main>

        {/* Modal for displaying item details (renders when item is selected) */}
        <ItemDetailModal />
      </div>
    </MenuProvider>
  );
};

export default Home;
