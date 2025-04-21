/* eslint-disable react/require-default-props */
import React from 'react';
import { Tooltip } from 'antd';
import { CheckCircleTwoTone, WarningOutlined } from '@ant-design/icons';

interface StatusIconProps {
  status: number;
}

const StatusIcon: React.FC<StatusIconProps> = ({ status }) => {
  const isActive = status === 1;

  return (
    <Tooltip title={isActive ? 'Active' : 'Inactive'}>
      {isActive ? (
        <CheckCircleTwoTone twoToneColor="#52c41a" />
      ) : (
        <WarningOutlined style={{ color: '#faad14' }} />
      )}
    </Tooltip>
  );
};

export default StatusIcon;
