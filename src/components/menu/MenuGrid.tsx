import { useMenu } from '../../hooks/useMenu';
import MenuCard from './MenuCard';

/**
 * Loading Skeleton Component
 * Displays placeholder cards while data is loading
 */
const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {Array.from({ length: 8 }, (_, i) => (
      <div key={i} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md animate-pulse">
        <div className="h-48 md:h-52 bg-gray-200 dark:bg-gray-700 skeleton" />
        <div className="p-4 space-y-3">
          <div className="flex justify-between">
            <div className="h-6 w-3/5 bg-gray-200 dark:bg-gray-700 rounded skeleton" />
            <div className="h-6 w-1/5 bg-gray-200 dark:bg-gray-700 rounded skeleton" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded skeleton" />
            <div className="h-4 w-4/5 bg-gray-200 dark:bg-gray-700 rounded skeleton" />
          </div>
          <div className="flex gap-2">
            <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full skeleton" />
            <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full skeleton" />
          </div>
          <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded-lg skeleton" />
        </div>
      </div>
    ))}
  </div>
);

/**
 * Error State Component
 * Displays when API request fails
 */
const ErrorState = ({ message, onRetry }: { message: string; onRetry?: () => void }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4">
    <div className="w-24 h-24 mb-6 text-red-400">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
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
      {message}
    </p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 
                 text-white font-semibold rounded-lg transition-colors"
      >
        Try Again
      </button>
    )}
  </div>
);

/**
 * Empty State Component
 * Displays when no items match the search/filter
 */
const EmptyState = ({ searchQuery, onClear }: { searchQuery: string; onClear: () => void }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4">
    <div className="w-32 h-32 mb-6">
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-gray-300 dark:text-gray-600">
        <path 
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
          stroke="currentColor" 
          strokeWidth={1.5} 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M10 7v6M7 10h6" 
          stroke="currentColor" 
          strokeWidth={1.5} 
          strokeLinecap="round"
        />
      </svg>
    </div>
    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
      No items found
    </h3>
    <p className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-6">
      {searchQuery 
        ? `We couldn't find any items matching "${searchQuery}". Try a different search term.`
        : 'No items available in this category.'
      }
    </p>
    {searchQuery && (
      <button
        onClick={onClear}
        className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 
                 text-white font-semibold rounded-lg transition-colors"
      >
        Clear Search
      </button>
    )}
  </div>
);

/**
 * MenuGrid Component
 * Main component for displaying the menu items grid
 * Handles:
 * - Loading state with skeleton placeholders
 * - Error state with retry option
 * - Empty state for no results
 * - Responsive grid layout
 * - Item count display
 */
const MenuGrid = () => {
  const { items, loading, error, searchQuery, clearSearch } = useMenu();

  // Loading state
  if (loading) {
    return (
      <section className="p-4 md:p-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-gray-500 dark:text-gray-400">Loading delicious items...</span>
        </div>
        <LoadingSkeleton />
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="p-4 md:p-6 max-w-7xl mx-auto">
        <ErrorState 
          message={error} 
          onRetry={() => window.location.reload()} 
        />
      </section>
    );
  }

  // Empty state
  if (items.length === 0) {
    return (
      <section className="p-4 md:p-6 max-w-7xl mx-auto">
        <EmptyState searchQuery={searchQuery} onClear={clearSearch} />
      </section>
    );
  }

  // Main grid display
  return (
    <section className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Results count - moved inside grid for better context */}
      {searchQuery && (
        <div className="mb-4 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg 
                      border border-orange-200 dark:border-orange-800">
          <p className="text-sm text-orange-700 dark:text-orange-400">
            Found <span className="font-bold">{items.length}</span> items matching "{searchQuery}"
          </p>
        </div>
      )}

      {/* Menu items grid - Responsive layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {items.map((item, index) => (
          <div
            key={item.id}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <MenuCard item={item} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default MenuGrid;
