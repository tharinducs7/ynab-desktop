/* eslint-disable react/require-default-props */
import React from 'react';

interface PriceDisplayProps {
  value: number;
  currencySymbol?: string; // e.g., 'Rs.', 'LKR'
  decimalPlaces?: number;
  symbolPosition?: 'prefix' | 'suffix';
  style?: React.CSSProperties;
  className?: string;
}

const formatPriceParts = (value: number, decimalPlaces = 2): string => {
  return value.toFixed(decimalPlaces).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const PriceDisplay: React.FC<PriceDisplayProps> = ({
  value,
  currencySymbol = 'Rs.',
  decimalPlaces = 2,
  symbolPosition = 'prefix',
  style = {},
  className = '',
}) => {
  const formattedValue = formatPriceParts(value, decimalPlaces);

  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'flex-end',
        gap: '4px',
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {symbolPosition === 'prefix' && (
        <span style={{ fontSize: '0.75em' }}>{currencySymbol}</span>
      )}
      <span style={{ fontWeight: 600 }}>{formattedValue}</span>
      {symbolPosition === 'suffix' && (
        <span style={{ fontSize: '0.75em' }}>{currencySymbol}</span>
      )}
    </div>
  );
};

export default PriceDisplay;
