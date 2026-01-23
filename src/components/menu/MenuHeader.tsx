
import SearchBar from "./SearchBar";

const MenuHeader = () => {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-md transition-colors duration-300 w-full">
      <div className="px-4 py-3 md:py-4">
        <div className="flex flex-col sm:flex-row justify-end gap-3 md:gap-4">
          <SearchBar />
        </div>
      </div>
    </header>
  );
};

export default MenuHeader;
