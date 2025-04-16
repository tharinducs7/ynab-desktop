// src/mappers/menuMapper.ts
import React from 'react';
import type { MenuProps } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

// Your AuthModule definition
export interface AuthModule {
  parent_menu: {
    id: number;
    name: string;
    url: string;
    icon: string;
    permissions: {
      is_enable: number;
      can_view: number;
      can_create: number;
      can_update: number;
      can_delete: number;
    };
  };
  sub_menus: Array<{
    sub_menu_name: string;
    sub_menu_icon: string;
    sub_menu_url: string;
    permissions: {
      is_enable: number;
      can_view: number;
      can_create: number;
      can_update: number;
      can_delete: number;
    };
    children?: Array<{
      id: number;
      name: string;
      url: string;
      icon: string;
      permissions: {
        is_enable: number;
        can_view: number;
        can_create: number;
        can_update: number;
        can_delete: number;
      };
    }>;
  }>;
}

// Extend AntD MenuItem to carry our extra fields
export type MenuItem = Required<MenuProps>['items'][number] & {
  permissions?: AuthModule['parent_menu']['permissions'];
  menuId?: number;
};

export const mapPermissionsToMenuItems = (
  modules: AuthModule[],
): MenuItem[] => {
  return modules.map((module) => {
    const { parent_menu: parent, sub_menus: subMenus } = module;

    // If exactly one submenu and no children, collapse into one item
    if (subMenus.length === 1 && (subMenus[0].children?.length ?? 0) === 0) {
      const onlySub = subMenus[0];
      return {
        key: onlySub.sub_menu_url,
        label: parent.name,
        icon: parent.icon ? <HomeOutlined /> : null,
        permissions: onlySub.permissions,
        menuId: parent.id,
      } as MenuItem;
    }

    // Otherwise map submenus (and their children)
    const childrenItems: MenuItem[] = subMenus.map((sub) => {
      const grandChildren: MenuItem[] = (sub.children || []).map((child) => ({
        key: child.url,
        label: child.name,
        icon: child.icon ? <HomeOutlined /> : null,
        permissions: child.permissions,
        menuId: child.id,
      }));

      return {
        key: sub.sub_menu_url,
        label: sub.sub_menu_name,
        icon: sub.sub_menu_icon ? <HomeOutlined /> : null,
        permissions: sub.permissions,
        menuId: parent.id,
        children: grandChildren.length ? grandChildren : undefined,
      } as MenuItem;
    });

    return {
      key: parent.url,
      label: parent.name,
      icon: parent.icon ? <HomeOutlined /> : null,
      permissions: parent.permissions,
      menuId: parent.id,
      children: childrenItems.length ? childrenItems : undefined,
    } as MenuItem;
  });
};
