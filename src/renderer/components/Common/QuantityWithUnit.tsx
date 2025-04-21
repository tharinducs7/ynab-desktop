/* eslint-disable react/require-default-props */
import { Tooltip } from 'antd';
import React from 'react';

interface QuantityWithUnitProps {
  value: number | string;
  unit: string;
  boldValue?: boolean;
  fullName?: string;
  damaged?: boolean;
  actual?: number; // NEW: Total quantity for damage percent
}

const QuantityWithUnit: React.FC<QuantityWithUnitProps> = ({
  value,
  unit,
  boldValue = false,
  fullName,
  damaged = false,
  actual,
}) => {
  const numericValue = Number(value);
  const numericActual = Number(actual || 0);
  const damagePercent =
    damaged && numericActual > 0 ? (numericValue / numericActual) * 100 : 0;

  const getColor = () => {
    if (!damaged || numericActual === 0) return undefined;
    if (damagePercent < 10) return 'green';
    if (damagePercent < 50) return 'orange';
    return 'red';
  };

  const tooltipTitle =
    damaged && numericActual > 0
      ? `${damagePercent.toFixed(0)}% is damaged!`
      : `${value} ${fullName || unit}`;

  return (
    <Tooltip title={tooltipTitle} style={{ whiteSpace: 'nowrap' }}>
      <span
        style={{
          fontWeight: boldValue ? 'bold' : 'normal',
          color: getColor(),
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontStyle: 'italic',
          fontWeight: 'bold',
          marginLeft: '0.2em',
          display: 'inline-block',
          color: getColor(),
        }}
      >
        {unit}
      </span>
    </Tooltip>
  );
};

export default QuantityWithUnit;
