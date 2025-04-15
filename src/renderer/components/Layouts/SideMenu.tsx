// renderer/components/SideMenu.tsx
import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useAuth } from '../../contexts/AuthContext';
import { mapPermissionsToMenuItems, MenuItem } from '../../mappers/menuMapper';

// A helper function to extract level keys from menu items (optional).
interface LevelKeysProps {
  key?: string;
  children?: LevelKeysProps[];
}
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

const SideMenu: React.FC = () => {
  const { authData } = useAuth();
  // Map authData.permissionsAndModules to Menu items.
  const menuItems: MenuItem[] = authData
    ? mapPermissionsToMenuItems(authData.permissionsAndModules)
    : [];

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

  return (
    <Menu
      mode="vertical"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      style={{ height: '100%', borderRight: 0 }}
      items={menuItems}
    />
  );
};

export default SideMenu;
