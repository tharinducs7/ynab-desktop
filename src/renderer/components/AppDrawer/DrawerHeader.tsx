/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/DrawerHeader.tsx
import React from 'react';
import { Avatar, Button, Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useAppContext } from '../../contexts/AppContext';

export type DrawerMode =
  | 'create_mode'
  | 'edit_mode'
  | 'view_mode'
  | 'delete_mode';

interface DrawerHeaderProps {
  title: string;
  subtitle: string;
  url: string;
  onCancel: () => void;
}

const DrawerHeader: React.FC<DrawerHeaderProps> = ({
  title,
  subtitle,
  onCancel,
  url,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Avatar src={url} shape="square" />
        <div>
          <Typography.Title
            level={4}
            style={{ margin: 0 }}
            className="font-poppins"
          >
            {title}
          </Typography.Title>
        </div>
      </div>

      <Button
        color="default"
        variant="solid"
        icon={
          <CloseOutlined
            onClick={onCancel}
            style={{ fontSize: 16, cursor: 'pointer' }}
          />
        }
        onClick={onCancel}
      />
    </div>
  );
};

export default DrawerHeader;
