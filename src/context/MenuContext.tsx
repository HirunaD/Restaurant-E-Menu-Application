import { createContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { fetchMenuItems, fetchCategories } from '../api/menuApi';
import type { MenuItem, Category } from '../types';

// Define the context value type
interface MenuContextType {
  items: MenuItem[];
  allItems: MenuItem[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  activeCategory: string;
  searchQuery: string;
  darkMode: boolean;
  selectedItem: MenuItem | null;
  cartCount: number;
  setActiveCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
  clearSearch: () => void;
  toggleDarkMode: () => void;
  setSelectedItem: (item: MenuItem | null) => void;
  addToCart: () => void;
}

// Create context with default undefined value
export const MenuContext = createContext<MenuContextType | undefined>(undefined);

interface MenuProviderProps {
  children: ReactNode;
}

/**
 * MenuProvider Component
 * Provides global state management for the menu application including:
 * - Menu items and categories data
 * - Loading and error states
 * - Category filtering
 * - Search functionality
 * - Dark mode toggle
 * - Item detail view state
 */
export const MenuProvider = ({ children }: MenuProviderProps) => {
  // Data state
  const [allItems, setAllItems] = useState<MenuItem[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  
  // UI state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [cartCount, setCartCount] = useState(0);

  // Initial data fetch - fetch all items once
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        // Fetch all data in parallel for better performance
        const [menuData, categoryData] = await Promise.all([
          fetchMenuItems(),
          fetchCategories()
        ]);
        
        setAllItems(menuData as MenuItem[]);
        setItems(menuData as MenuItem[]);
        setCategories(categoryData as Category[]);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setError('Failed to load menu. Please check if the API server is running on http://localhost:3001');
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Filter items when category or search query changes
  useEffect(() => {
    let filteredItems = [...allItems];

    // Apply category filter
    if (activeCategory !== 'all') {
      filteredItems = filteredItems.filter(
        item => item.category.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    // Apply search filter (case-insensitive search on name and description)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filteredItems = filteredItems.filter(
        item => 
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
      );
    }

    setItems(filteredItems);
  }, [activeCategory, searchQuery, allItems]);

  // Handle dark mode toggle with localStorage persistence
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      setDarkMode(JSON.parse(savedDarkMode));
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
    }
  }, []);

  useEffect(() => {
    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Clear search function
  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  // Toggle dark mode
  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => !prev);
  }, []);

  // Add to cart function (placeholder - shows alert)
  const addToCart = useCallback(() => {
    setCartCount(prev => prev + 1);
  }, []);

  const contextValue: MenuContextType = {
    items,
    allItems,
    categories,
    loading,
    error,
    activeCategory,
    searchQuery,
    darkMode,
    selectedItem,
    cartCount,
    setActiveCategory,
    setSearchQuery,
    clearSearch,
    toggleDarkMode,
    setSelectedItem,
    addToCart
  };

  return (
    <MenuContext.Provider value={contextValue}>
      {children}
    </MenuContext.Provider>
  );
};

export default MenuContext;
