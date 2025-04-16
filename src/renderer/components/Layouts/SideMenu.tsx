import React, { useState, useMemo } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { mapPermissionsToMenuItems, MenuItem } from '../../mappers/menuMapper';
import { useAppContext } from '../../contexts/AppContext';

interface LevelKeysProps {
  key?: string;
  children?: LevelKeysProps[];
}

// Helper to get level keys (unchanged)
const getLevelKeys = (items: LevelKeysProps[]) => {
  const keyLevels: Record<string, number> = {};
  const traverse = (nestedItems: LevelKeysProps[], level = 1) => {
    nestedItems.forEach((item) => {
      if (item.key) {
        keyLevels[item.key] = level;
      }
      if (item.children) {
        traverse(item.children, level + 1);
      }
    });
  };
  traverse(items);
  return keyLevels;
};

// A helper function that creates a mapping from a menu item's key to the entire menu item.
// Move it outside the component so it does not become a dependency of useMemo.
const createKeyItemMap = (items: MenuItem[]): Record<string, MenuItem> => {
  const map: Record<string, MenuItem> = {};
  items.forEach((item) => {
    // Ensure item exists and has a key.
    if (item && item.key) {
      map[item.key as string] = item;
    }
    // Check if the item has children.
    if (item && 'children' in item && Array.isArray(item.children)) {
      Object.assign(map, createKeyItemMap(item.children as MenuItem[]));
    }
  });
  return map;
};

const SideMenu: React.FC = () => {
  const navigate = useNavigate();
  const { authData } = useAuth();
  const { sidebarCollapsed, setSelectedMenuItem } = useAppContext();
  // Map permissions to Menu items.
  const menuItems: MenuItem[] = useMemo(
    () =>
      authData ? mapPermissionsToMenuItems(authData.permissionsAndModules) : [],
    [authData],
  );

  // Memoize the lookup of key -> full menu item.
  const keyToItemMapping = useMemo(
    () => createKeyItemMap(menuItems),
    [menuItems],
  );

  const levelKeys = getLevelKeys(menuItems as LevelKeysProps[]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const currentOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (currentOpenKey) {
      const repeatIndex = keys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
      setOpenKeys(
        keys
          .filter((_, index) => index !== repeatIndex)
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
      );
    } else {
      setOpenKeys(keys);
    }
  };

  const onClick: MenuProps['onClick'] = (e) => {
    // Get the full item based on e.key from our mapping.
    const selectedItem = keyToItemMapping[e.key];
    console.log('Clicked key:', e.key, 'Selected Item:', selectedItem);
    setSelectedMenuItem(selectedItem || null);
    // You can now access selectedItem.label or any other property you need.
    navigate(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      mode="vertical"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      style={{ height: '100%', borderRight: 0 }}
      items={menuItems}
      inlineCollapsed={sidebarCollapsed}
    />
  );
};

export default SideMenu;
