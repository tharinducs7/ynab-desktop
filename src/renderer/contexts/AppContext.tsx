import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { MenuItem } from '../mappers/menuMapper';

interface AppContextProps {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  selectedMenuItem: any | null;
  setSelectedMenuItem: (item: MenuItem | null) => void;
  // You can add more app-level states, e.g., language, global modals, etc.
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

// Custom hook to access the AppContext
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(
    null,
  );

  // Toggle function for sidebar collapsed state
  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed((prev) => !prev);
  }, []);

  const value = useMemo(
    () => ({
      sidebarCollapsed,
      toggleSidebar,
      theme,
      setTheme,
      selectedMenuItem,
      setSelectedMenuItem,
    }),
    [selectedMenuItem, sidebarCollapsed, theme, toggleSidebar],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
