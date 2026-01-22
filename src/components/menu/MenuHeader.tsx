import CartButton from "./CartButton";
import DarkModeToggle from "./DarkModeToggle";
import SearchBar from "./SearchBar";

const MenuHeader = () => {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-md transition-colors duration-300 w-full">
      <div className="px-4 py-3 md:py-4">
        <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4">
          <SearchBar />

          <div className="flex items-center gap-2 md:gap-3">
            <DarkModeToggle />
            <CartButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default MenuHeader;
