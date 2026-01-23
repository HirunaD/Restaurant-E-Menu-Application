import { useState, useEffect } from "react";
import { useMenu } from "../../hooks/useMenu";
import MenuCard from "./MenuCard";

// Responsive items per page based on screen width
const getItemsPerPage = (width: number): number => {
  if (width < 640) return 6;       // mobile: 2 cols × 3 rows
  if (width < 1024) return 6;      // tablet: 3 cols × 3 rows
  return 10;                        // large: 5 cols × 2 rows
};

const MenuGrid = () => {
  const { items, loading, error, searchQuery, clearSearch } = useMenu();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(() => 
    typeof window !== "undefined" ? getItemsPerPage(window.innerWidth) : 10
  );
  const [prevItemsLength, setPrevItemsLength] = useState(items.length);
  const [prevSearchQuery, setPrevSearchQuery] = useState(searchQuery);

  // Handle responsive items per page
  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Reset to page 1 when items change (React-recommended pattern for adjusting state during render)
  if (items.length !== prevItemsLength || searchQuery !== prevSearchQuery) {
    setCurrentPage(1);
    setPrevItemsLength(items.length);
    setPrevSearchQuery(searchQuery);
  }

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = items.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages: (number | string)[] = [];
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
    
    if (isMobile) {
      // Simplified pagination for mobile
      if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        if (currentPage <= 2) {
          pages.push(1, 2, "...", totalPages);
        } else if (currentPage >= totalPages - 1) {
          pages.push(1, "...", totalPages - 1, totalPages);
        } else {
          pages.push(1, "...", currentPage, "...", totalPages);
        }
      }
    } else if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }

    return (
      <div className="flex items-center justify-center gap-1 sm:gap-2 mt-8">
        {/* Previous Button */}
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 
                     hover:bg-orange-100 dark:hover:bg-orange-900/30 disabled:opacity-50 disabled:cursor-not-allowed
                     transition-colors duration-200"
          aria-label="Previous page"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Page Numbers */}
        {pages.map((page, index) => (
          page === "..." ? (
            <span key={`ellipsis-${index}`} className="px-2 sm:px-3 py-1.5 sm:py-2 text-gray-500 dark:text-gray-400 text-sm sm:text-base">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => goToPage(page as number)}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-medium text-sm sm:text-base transition-colors duration-200
                ${currentPage === page
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-orange-900/30"
                }`}
            >
              {page}
            </button>
          )
        ))}

        {/* Next Button */}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 
                     hover:bg-orange-100 dark:hover:bg-orange-900/30 disabled:opacity-50 disabled:cursor-not-allowed
                     transition-colors duration-200"
          aria-label="Next page"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    );
  };

  if (loading) {
    return (
      <section className="p-4 md:p-6">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-gray-500 dark:text-gray-400">
            Loading delicious items...
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden shadow-md animate-pulse"
            >
              <div className="h-48 bg-gray-200 dark:bg-gray-700" />
              <div className="p-4 space-y-3">
                <div className="flex justify-between">
                  <div className="h-6 w-3/5 bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="h-6 w-1/5 bg-gray-200 dark:bg-gray-700 rounded" />
                </div>
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-4 w-4/5 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="p-4 md:p-6">
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="w-24 h-24 mb-6 text-red-400">
            <svg
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              className="w-full h-full"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-6">
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="p-4 md:p-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="w-32 h-32 mb-6 text-gray-300 dark:text-gray-600">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
              <path
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            No items found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-6">
            {searchQuery
              ? `We couldn't find any items matching "${searchQuery}".`
              : "No items available in this category."}
          </p>
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
            >
              Clear Search
            </button>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="p-4 md:p-6 w-full">
      {searchQuery && (
        <div className="mb-4 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
          <p className="text-sm text-orange-700 dark:text-orange-400">
            Found <span className="font-bold">{items.length}</span> items
            matching "{searchQuery}"
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {paginatedItems.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>

      {renderPagination()}

      {/* Page info */}
      {totalPages > 1 && (
        <div className="text-center mt-4 text-sm text-gray-500 dark:text-gray-400">
          Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, items.length)} of {items.length} items
        </div>
      )}
    </section>
  );
};

export default MenuGrid;
