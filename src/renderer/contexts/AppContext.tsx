import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { MenuItem } from '../mappers/menuMapper';

export type DrawerMode =
  | 'view_mode'
  | 'edit_mode'
  | 'create_mode'
  | 'delete_mode';

interface AppContextProps {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;

  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;

  selectedMenuItem: any | null;
  setSelectedMenuItem: (item: any | null) => void;

  drawerVisible: boolean;
  openDrawer: (mode: DrawerMode) => void;
  closeDrawer: () => void;
  drawerMode: DrawerMode;

  drawerData: any | null;
  setDrawerData: (data: any | null) => void;

  loadingDrawer: boolean;
  setLoadingDrawer: (isloading: boolean) => void;

  loadingPage: boolean;
  setLoadingPage: (isloading: boolean) => void;

  reloadTable?: () => void;
  setReloadTable?: (fn: () => void) => void;
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
  const [drawerData, setDrawerData] = useState<any | null>(null);
  // Toggle function for sidebar collapsed state
  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed((prev) => !prev);
  }, []);

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerMode, setDrawerMode] = useState<DrawerMode>('view_mode');
  const [loadingDrawer, setLoadingDrawer] = useState<boolean>(false);
  const [loadingPage, setLoadingPage] = useState<boolean>(false);
  const [reloadTable, setReloadTable] = useState<() => void>(() => () => {});

  const openDrawer = useCallback((mode: DrawerMode) => {
    setDrawerMode(mode);
    setDrawerVisible(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setDrawerVisible(false);
    setDrawerData(null);
  }, []);

  const value = useMemo(
    () => ({
      sidebarCollapsed,
      toggleSidebar,
      theme,
      setTheme,
      selectedMenuItem,
      setSelectedMenuItem,
      drawerVisible,
      openDrawer,
      closeDrawer,
      drawerMode,
      drawerData,
      setDrawerData,
      loadingDrawer,
      setLoadingDrawer,
      loadingPage,
      setLoadingPage,
      reloadTable,
      setReloadTable,
    }),
    [
      closeDrawer,
      drawerMode,
      drawerVisible,
      openDrawer,
      selectedMenuItem,
      sidebarCollapsed,
      theme,
      toggleSidebar,
      drawerData,
      loadingDrawer,
      loadingPage,
      reloadTable,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
