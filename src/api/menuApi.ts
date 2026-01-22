const BASE_URL = "http://localhost:3001";

/**
 * Generic fetch wrapper with error handling
 * @param endpoint - API endpoint to fetch
 * @returns Promise with the parsed JSON response
 */
const fetchWithErrorHandling = async <T>(endpoint: string): Promise<T> => {
  const response = await fetch(`${BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const fetchRestaurantInfo = () => fetchWithErrorHandling("/restaurant");

export const fetchCategories = () => fetchWithErrorHandling("/categories");

/**
 * Fetch menu items with optional query parameters
 * @param params - Query string for filtering (e.g., '?category=appetizers')
 */
export const fetchMenuItems = (params = "") =>
  fetchWithErrorHandling(`/menuItems${params}`);

/**
 * Fetch menu items by category
 * @param category - Category name to filter by
 */
export const fetchMenuItemsByCategory = (category: string) =>
  fetchWithErrorHandling(`/menuItems?category=${category}`);

/**
 * Search menu items by name
 * @param searchTerm - Search term to match against item names
 */
export const searchMenuItems = (searchTerm: string) =>
  fetchWithErrorHandling(
    `/menuItems?name_like=${encodeURIComponent(searchTerm)}`,
  );

/**
 * Fetch popular menu items
 */
export const fetchPopularItems = () =>
  fetchWithErrorHandling("/menuItems?popular=true");

/**
 * Fetch a single menu item by ID
 * @param id - Menu item ID
 */
export const fetchMenuItemById = (id: number) =>
  fetchWithErrorHandling(`/menuItems/${id}`);
