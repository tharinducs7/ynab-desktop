import React from 'react';
import { Space, Button } from 'antd';
import { CloseOutlined, SaveOutlined } from '@ant-design/icons';
import { useAppContext } from '../../contexts/AppContext';

const BUTTON_WIDTH = 100;

interface DrawerFooterProps {
  onCancel: () => void;
  onSave: () => void;
}

const DrawerFooter: React.FC<DrawerFooterProps> = ({ onCancel, onSave }) => {
  const { closeDrawer, selectedMenuItem } = useAppContext();
  const perms = selectedMenuItem?.permissions;

  const handleCancel = () => {
    onCancel?.();
    closeDrawer();
  };

  return (
    <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
      <Button
        icon={<CloseOutlined />}
        onClick={handleCancel}
        style={{ width: BUTTON_WIDTH }}
      >
        Cancel
      </Button>

      {perms?.can_create && (
        <Button
          type="primary"
          icon={<SaveOutlined />}
          onClick={onSave}
          style={{ width: BUTTON_WIDTH }}
        >
          Save
        </Button>
      )}
    </Space>
  );
};

export default DrawerFooter;
