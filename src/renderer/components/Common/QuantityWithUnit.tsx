/* eslint-disable react/require-default-props */
import { Tooltip } from 'antd';
import React from 'react';

interface QuantityWithUnitProps {
  value: number | string;
  unit: string;
  boldValue?: boolean;
  fullName?: string;
}

const QuantityWithUnit: React.FC<QuantityWithUnitProps> = ({
  value,
  unit,
  boldValue = false,
  fullName,
}) => {
  return (
    <Tooltip
      title={`${value} ${fullName || unit}`}
      style={{ whiteSpace: 'nowrap' }}
    >
      <span style={{ fontWeight: boldValue ? 'bold' : 'normal' }}>{value}</span>
      <span
        style={{
          fontStyle: 'italic',
          fontWeight: 'bold',
          marginLeft: '0.2em',
          display: 'inline-block',
        }}
      >
        {unit}
      </span>
    </Tooltip>
  );
};

export default QuantityWithUnit;
