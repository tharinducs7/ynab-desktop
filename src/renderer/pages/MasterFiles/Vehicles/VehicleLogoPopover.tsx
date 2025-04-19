// src/components/VehicleLogoPopover.tsx
import React, { useState } from 'react';
import { Popover, Tooltip, Image } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

interface Props {
  make: string;
  model: string;
}

const VehicleLogoPopover: React.FC<Props> = ({ make, model }) => {
  const [imgError, setImgError] = useState(false);

  const sanitizedModel = model.toLowerCase().replace(/\s+/g, '-');
  const imageUrl = `https://ik.imagekit.io/wyseerp/${make.toLowerCase()}-${sanitizedModel}.png`;

  if (imgError) return null;

  return (
    <Popover
      title={`${make} ${model}`}
      content={
        <div style={{ maxWidth: 200 }}>
          <Image
            src={imageUrl}
            alt={`${make} ${model}`}
            style={{ width: '100%', borderRadius: 4 }}
            onError={() => setImgError(true)}
            preview={false}
          />
        </div>
      }
    >
      <Tooltip title="View logo">
        <InfoCircleOutlined
          style={{
            fontSize: 18,
            color: '#1890ff',
            cursor: 'pointer',
          }}
        />
      </Tooltip>
    </Popover>
  );
};

export default VehicleLogoPopover;
