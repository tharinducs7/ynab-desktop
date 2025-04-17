/* eslint-disable react/require-default-props */
// src/components/AppDrawer.tsx
import React from 'react';
import { Drawer, Button, Space } from 'antd';
import type { DrawerProps } from 'antd';
import { useAppContext, DrawerMode } from '../../contexts/AppContext';

export interface AppDrawerProps
  extends Omit<DrawerProps, 'visible' | 'onClose'> {
  /** Optional title override; defaults to capitalized mode */
  title?: string;
  /** Callback when the primary action is clicked */
  onSubmit?: () => void;
  onClose: () => void;
  /** Optional additional buttons in the footer */
  extraFooterButtons?: React.ReactNode;
}

const modeTitles: Record<DrawerMode, string> = {
  view_mode: 'View',
  edit_mode: 'Edit',
  create_mode: 'Create',
  delete_mode: 'Delete',
};

const AppDrawer: React.FC<AppDrawerProps> = ({
  title,
  children,
  onSubmit,
  onClose,
  extraFooterButtons,
  ...rest
}) => {
  const { drawerVisible, closeDrawer, drawerMode } = useAppContext();

  const drawerTitle = title ?? modeTitles[drawerMode];

  const onCloseDrawer = () => {
    onClose();
    closeDrawer();
  };

  return (
    <Drawer
      title={drawerTitle}
      placement="right"
      width={600}
      onClose={onCloseDrawer}
      visible={drawerVisible}
      footer={
        <Space style={{ float: 'right' }}>
          {extraFooterButtons}
          <Button onClick={closeDrawer}>Cancel</Button>
          <Button type="primary" onClick={onSubmit}>
            Submit
          </Button>
        </Space>
      }
      bodyStyle={{
        padding: 24,
        overflowY: 'auto',
        height:
          'calc(100% - 64px - 55px)' /* adjust if header/footer heights differ */,
      }}
      afterVisibleChange={rest.afterVisibleChange}
      destroyOnClose={rest.destroyOnClose}
      maskClosable={rest.maskClosable}
      keyboard={rest.keyboard}
      zIndex={rest.zIndex}
      style={rest.style}
      className={rest.className}
      getContainer={rest.getContainer}
      forceRender={rest.forceRender}
      closeIcon={rest.closeIcon}
    >
      {children}
    </Drawer>
  );
};

export default AppDrawer;
