import React from 'react';
import type { MenuProps } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
// Define interfaces representing your permissions structure.
export interface AuthModule {
  parent_menu: {
    id: number;
    name: string;
    url: string;
    icon: string; // e.g. "ki-filled ki-safe-home"
    permissions: any; // You can type this more strictly as needed.
  };
  sub_menus: Array<{
    sub_menu_name: string;
    sub_menu_icon: string;
    sub_menu_url: string;
    permissions: any;
    children?: Array<{
      id: number;
      name: string;
      url: string;
      icon: string;
      permissions: any;
    }>;
  }>;
}

// Type alias for an AntD Menu item.
export type MenuItem = Required<MenuProps>['items'][number];

/**
 * Maps an array of AuthModule objects to an array of Ant Design MenuItems.
 *
 * If a module has exactly one submenu and that submenu has no children,
 * the parent item will be returned as a single clickable menu item using the submenu's URL.
 * Otherwise, the parent item will display its children (submenus) normally.
 */
export const mapPermissionsToMenuItems = (
  modules: AuthModule[],
): MenuItem[] => {
  return modules.map((module) => {
    const parent = module.parent_menu;

    // Check if there is exactly one submenu and it does not have any children.
    if (
      module.sub_menus &&
      module.sub_menus.length === 1 &&
      (!module.sub_menus[0].children ||
        module.sub_menus[0].children.length === 0)
    ) {
      const onlySub = module.sub_menus[0];
      return {
        // Use the submenu's URL as the key and redirect target.
        key: onlySub.sub_menu_url || `menu_parent_${parent.id}`,
        label: parent.name,
        icon: parent.icon ? <HomeOutlined /> : null,
        // No children: this will be rendered as a single clickable item.
      } as MenuItem;
    }

    // Otherwise, map sub_menus (and potential nested children) as normal.
    const childrenItems: MenuItem[] | undefined =
      module.sub_menus && module.sub_menus.length > 0
        ? module.sub_menus.map((sub) => {
            const subKey = sub.sub_menu_url || `menu_sub_${sub.sub_menu_name}`;
            const grandChildren: MenuItem[] | undefined =
              sub.children && sub.children.length > 0
                ? sub.children.map((child) => ({
                    key: child.url || `menu_child_${child.id}`,
                    label: child.name,
                    icon: child.icon ? <HomeOutlined /> : null,
                  }))
                : undefined;
            return {
              key: subKey,
              label: sub.sub_menu_name,
              icon: sub.sub_menu_icon ? <HomeOutlined /> : null,
              children: grandChildren,
            } as MenuItem;
          })
        : undefined;

    // Return the parent item with its mapped children.
    return {
      key: parent.url || `menu_parent_${parent.id}`,
      label: parent.name,
      icon: parent.icon ? <HomeOutlined /> : null,
      children: childrenItems,
    } as MenuItem;
  });
};
