export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  dietary: string[];
  spicyLevel: number;
  popular: boolean;
  available: boolean;
  preparationTime: number;
  ingredients?: string[];
  customizations?: {
    sizes?: Array<{ name: string; priceModifier: number }>;
    addOns?: Array<{ name: string; price: number }>;
  };
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Restaurant {
  name: string;
  tagline: string;
  description: string;
  openingHours: string;
  contact: {
    phone: string;
    email: string;
    address: string;
  };
}

export interface FilterOptions {
  priceRange: [number, number];
  dietary: string[];
  sortBy: 'name' | 'price-asc' | 'price-desc' | 'popular';
}

export interface CartItem extends MenuItem {
  quantity: number;
  selectedSize?: string;
  selectedAddOns?: string[];
}

export interface MenuContextType {
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

export interface ModalContentProps {
  item: MenuItem;
  onClose: () => void;
  onAddToCart: () => void;
}