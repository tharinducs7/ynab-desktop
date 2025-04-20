/* eslint-disable react/require-default-props */
// src/components/AppDrawer/AppDrawer.tsx
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Drawer } from 'antd';
import DrawerHeader from './DrawerHeader';
import DrawerFooter from './DrawerFooter';

interface AppDrawerProps {
  visible: boolean;
  title: string;
  subtitle?: string;
  icon?: string;
  onCancel: () => void;
  onSave?: () => void;
  children: React.ReactNode;
  width?: number;
  size?: 'default' | 'large' | undefined;
}

const AppDrawer: React.FC<AppDrawerProps> = ({
  visible,
  title,
  subtitle = ' ',
  icon = '',
  onCancel,
  onSave = () => {},
  children,
  width = 600,
  size = 'default',
  ...rest
}) => {
  return (
    <Drawer
      title={
        <DrawerHeader
          title={title}
          subtitle={subtitle}
          url={icon}
          onCancel={onCancel}
        />
      }
      size={size}
      visible={visible}
      closable={false}
      onClose={onCancel}
      width={width}
      bodyStyle={{
        paddingBottom: 80,
        maxHeight: 'calc(100vh - 64px)',
        overflowY: 'auto',
      }}
      footer={<DrawerFooter onCancel={onCancel} onSave={onSave} />}
      {...rest}
    >
      {children}
    </Drawer>
  );
};

export default AppDrawer;
