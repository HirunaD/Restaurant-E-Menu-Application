import { useMenu } from "../../hooks/useMenu";

const categoryIcons: Record<string, string> = {
  all: "🍽️",
  appetizers: "🥗",
  mains: "🍖",
  desserts: "🍰",
  beverages: "🥤",
};

const CategoryFilter = () => {
  const { categories, activeCategory, setActiveCategory, allItems, items } =
    useMenu();

  // Count items per category
  const getCategoryCount = (categoryId: string): number => {
    if (categoryId === "all") return allItems.length;
    return allItems.filter(
      (item) => item.category.toLowerCase() === categoryId.toLowerCase(),
    ).length;
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-15 md:top-18 z-40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex gap-2 md:gap-3 overflow-x-auto hide-scrollbar pb-1 -mb-1">
          <button
            onClick={() => setActiveCategory("all")}
            className={`
              flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 
              rounded-full font-medium text-sm md:text-base
              whitespace-nowrap transition-all duration-200
              ${
                activeCategory === "all"
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30 scale-105"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }
            `}
            aria-pressed={activeCategory === "all"}
          >
            <span className="text-lg">{categoryIcons.all}</span>
            <span>All</span>
            <span
              className={`
              text-xs px-1.5 py-0.5 rounded-full
              ${
                activeCategory === "all"
                  ? "bg-white/20 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
              }
            `}
            >
              {getCategoryCount("all")}
            </span>
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`
                flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 
                rounded-full font-medium text-sm md:text-base
                whitespace-nowrap transition-all duration-200
                ${
                  activeCategory === category.id
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30 scale-105"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }
              `}
              aria-pressed={activeCategory === category.id}
            >
              <span className="text-lg">
                {categoryIcons[category.id] || "🍴"}
              </span>
              <span className="capitalize">{category.name}</span>
              <span
                className={`
                text-xs px-1.5 py-0.5 rounded-full
                ${
                  activeCategory === category.id
                    ? "bg-white/20 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                }
              `}
              >
                {getCategoryCount(category.id)}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between text-sm">
          <p className="text-gray-500 dark:text-gray-400">
            Showing{" "}
            <span className="font-semibold text-gray-700 dark:text-gray-200">
              {items.length}
            </span>{" "}
            items
            {activeCategory !== "all" && (
              <span>
                {" "}
                in{" "}
                <span className="capitalize font-medium text-orange-500">
                  {activeCategory}
                </span>
              </span>
            )}
          </p>
        </div>
      </div>
    </nav>
  );
};

export default CategoryFilter;
