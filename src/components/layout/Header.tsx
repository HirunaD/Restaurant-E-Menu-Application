import { useMenu } from "../../hooks/useMenu";

const Header = () => {
  const {
    searchQuery,
    setSearchQuery,
    clearSearch,
    darkMode,
    toggleDarkMode,
    cartCount,
  } = useMenu();

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-3 md:py-4">
        {/* Top row - Logo, Search, Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4">
          {/* Logo and Restaurant Name */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Custom Logo SVG */}
            <div className="w-10 h-10 md:w-12 md:h-12 bg-linear-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg
                className="w-6 h-6 md:w-7 md:h-7 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
            </div>
            <div className="hidden xs:block">
              <h1 className="text-xl md:text-2xl font-bold bg-linear-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                Delicious Bites
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 -mt-0.5 hidden md:block">
                Fresh • Flavorful • Fast
              </p>
            </div>
          </div>

          {/* Search Bar */}
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
            {/* Clear search button - only shows when there's a search query */}
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

          {/* Right side actions */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 
                       hover:bg-gray-200 dark:hover:bg-gray-700 
                       transition-colors duration-200"
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {darkMode ? (
                <svg
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {/* Cart Icon with Badge */}
            <button
              className="relative p-2.5 rounded-full bg-orange-100 dark:bg-orange-900/30 
                       hover:bg-orange-200 dark:hover:bg-orange-900/50 
                       transition-colors duration-200"
              aria-label={`Shopping cart with ${cartCount} items`}
              onClick={() => alert("Cart functionality is a placeholder")}
            >
              <svg
                className="w-5 h-5 text-orange-600 dark:text-orange-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {/* Cart count badge */}
              {cartCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-5 h-5 
                               bg-orange-500 text-white text-xs font-bold 
                               rounded-full flex items-center justify-center
                               animate-pulse"
                >
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
