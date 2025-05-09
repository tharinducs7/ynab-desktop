/* eslint-disable react/require-default-props */
// src/components/AppDrawer/AppDrawer.tsx
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Drawer, Spin } from 'antd';
import DrawerHeader from './DrawerHeader';
import DrawerFooter from './DrawerFooter';
import { useAppContext } from '../../contexts/AppContext';

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
  const { loadingDrawer } = useAppContext();
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
      <Spin spinning={loadingDrawer} fullscreen />
    </Drawer>
  );
};

export default AppDrawer;
