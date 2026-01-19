import { MenuProvider } from "../context/MenuContext";
import CategoryFilter from "../components/menu/CategoryFilter";
import MenuGrid from "../components/menu/MenuGrid";
import ItemDetailModal from "../components/menu/ItemDetailModal";

const Home = () => {
  return (
    <div>
      <MenuProvider>
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
          {/* Header with search and navigation */}
          {/* <Header /> */}

          {/* Category filter tabs */}
          <CategoryFilter />

          {/* Main content - Menu grid */}
          <main className="flex-1">
            <MenuGrid />
          </main>

          {/* Footer */}
          {/* <Footer /> */}

          {/* Item Detail Modal - renders on top when item is selected */}
          <ItemDetailModal />
        </div>
      </MenuProvider>
    </div>
  );
};

export default Home;
