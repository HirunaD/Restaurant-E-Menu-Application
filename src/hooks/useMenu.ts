import { useContext } from 'react';
import { MenuContext } from '../context/MenuContext';

/**
 * Custom hook to access the MenuContext
 * Provides type-safe access to menu state and actions
 * @throws Error if used outside of MenuProvider
 */
export const useMenu = () => {
  const context = useContext(MenuContext);
  
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  
  return context;
};

export default useMenu;
