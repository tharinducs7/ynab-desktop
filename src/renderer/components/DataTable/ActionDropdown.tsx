/* eslint-disable react/require-default-props */
// src/components/ActionDropdown.tsx
import React, { useMemo } from 'react';
import type { MenuProps } from 'antd';
import { Dropdown, Button } from 'antd';
import {
  MoreOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  // PlusOutlined,
  // DownloadOutlined,
  // ArchiveOutlined,
  // CheckOutlined,
} from '@ant-design/icons';
import { useAppContext } from '../../contexts/AppContext';

export interface ActionDropdownProps<T> {
  /** The row or context object you want actions to operate on */
  data: T;
  /**
   * Optional callback fired when an action is clicked.
   * Receives (actionKey, menuId, data).
   */
  onAction?: (actionKey: string, menuId?: number, data?: T) => void;
}

const ActionDropdown = <T extends Record<string, any>>({
  data,
  onAction,
}: ActionDropdownProps<T>) => {
  const { selectedMenuItem, openDrawer } = useAppContext();
  const perms = selectedMenuItem?.permissions;
  const menuId = selectedMenuItem?.menuId;

  // map action keys to icons
  const iconMap: Record<string, React.ReactNode> = {
    view: <EyeOutlined />,
    edit: <EditOutlined />,
    delete: <DeleteOutlined />,
    // create: <PlusOutlined />,
    // export: <DownloadOutlined />,
    // archive: <ArchiveOutlined />,
    // approve: <CheckOutlined />,
  };

  const items: MenuProps['items'] = useMemo(() => {
    if (!perms) return [];

    const actionItems: MenuProps['items'] = [];

    // Standard permission‑based actions
    if (perms.can_view)
      actionItems.push({
        key: 'view_mode',
        label: 'View Details',
        icon: iconMap.view,
      });
    // if (perms.can_create)
    //   actionItems.push({
    //     key: 'create',
    //     label: 'Create New',
    //     icon: iconMap.create,
    //   });
    if (perms.can_update)
      actionItems.push({
        key: 'edit_mode',
        label: 'Edit',
        icon: iconMap.edit,
      });
    if (perms.can_delete)
      actionItems.push({
        key: 'delete_mode',
        label: 'Delete',
        danger: true,
        icon: iconMap.delete,
      });

    // ─── SPECIAL CASES ────────────────────────────────────────────────
    // e.g. if this menuId needs extra actions:
    // if (menuId === 42) {
    //   actionItems.push({
    //     key: 'export',
    //     label: 'Export CSV',
    //     icon: iconMap.export,
    //   });
    //   actionItems.push({
    //     key: 'archive',
    //     label: 'Archive',
    //     danger: true,
    //     icon: iconMap.archive,
    //   });
    // }
    //
    // Or based on the row data itself:
    // if ((data as any).status === 'pending') {
    //   actionItems.push({
    //     key: 'approve',
    //     label: 'Approve',
    //     icon: iconMap.approve,
    //   });
    // }
    // ────────────────────────────────────────────────────────────────

    return actionItems;
  }, [perms, iconMap.view, iconMap.edit, iconMap.delete]);

  const onMenuClick: MenuProps['onClick'] = ({ key }: any) => {
    console.log('Action:', key, 'on menuId:', menuId, 'with data:', data);
    openDrawer(key);
    if (onAction) onAction(key, menuId, data);
  };

  return (
    <Dropdown
      menu={{ items, onClick: onMenuClick }}
      placement="bottomLeft"
      arrow
    >
      <Button
        variant="solid"
        color="cyan"
        icon={<MoreOutlined />}
        disabled={!items.length}
      />
    </Dropdown>
  );
};

export default ActionDropdown;
