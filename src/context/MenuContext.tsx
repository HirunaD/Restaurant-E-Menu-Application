import { useState, useEffect, useCallback, type ReactNode } from 'react';
import { fetchMenuItems, fetchCategories } from '../api/menuApi';
import type { MenuItem, Category, MenuContextType } from '../types';
import { MenuContext } from './menuContextDef';
export { MenuContext };

interface MenuProviderProps {
  children: ReactNode;
}

export const MenuProvider = ({ children }: MenuProviderProps) => {
  const [allItems, setAllItems] = useState<MenuItem[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
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

  useEffect(() => {
    let filteredItems = [...allItems];

    if (activeCategory !== 'all') {
      filteredItems = filteredItems.filter(
        item => item.category.toLowerCase() === activeCategory.toLowerCase()
      );
    }

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
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => !prev);
  }, []);

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

export default MenuProvider;
