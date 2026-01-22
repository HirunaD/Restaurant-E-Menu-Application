import { useMenu } from "../../hooks/useMenu";

const SearchBar = () => {
  const { searchQuery, setSearchQuery, clearSearch } = useMenu();

  return (
    <div className="relative flex-1 w-full max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
          className="h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search your favorite food..."
        className="w-full pl-10 pr-10 py-2.5 text-sm md:text-base 
                   bg-gray-50 dark:bg-gray-800 
                   border border-gray-200 dark:border-gray-700 
                   rounded-full 
                   text-gray-900 dark:text-white
                   placeholder-gray-500 dark:placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
                   transition-all duration-200"
        aria-label="Search menu items"
      />

      {searchQuery && (
        <button
          onClick={clearSearch}
          className="absolute inset-y-0 right-0 pr-3 flex items-center 
                     text-gray-400 hover:text-gray-600 dark:hover:text-gray-300
                     transition-colors duration-200"
          aria-label="Clear search"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SearchBar;
