/* eslint-disable react/require-default-props */
import React, { useMemo } from 'react';
import { Select } from 'antd';

interface UnitCategory {
  value: string;
  label: string;
}

interface CategorySelectProps {
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  placeholder?: string;
}

const UnitGroupSelect: React.FC<CategorySelectProps> = ({
  value,
  onChange,
  disabled,
  readOnly,
  required = true,
  placeholder = 'Select Category',
}) => {
  const filteredOptions = useMemo(() => {
    const data: UnitCategory[] = [
      { value: 'Digital Storage', label: 'Digital Storage' },
      { value: 'Power', label: 'Power' },
      { value: 'Energy', label: 'Energy' },
      { value: 'Pressure', label: 'Pressure' },
      { value: 'Speed', label: 'Speed' },
      { value: 'Time', label: 'Time' },
      { value: 'Temperature', label: 'Temperature' },
      { value: 'Area', label: 'Area' },
      { value: 'Volume / Capacity', label: 'Volume / Capacity' },
      { value: 'Length / Distance', label: 'Length / Distance' },
      { value: 'Weight / Mass', label: 'Weight / Mass' },
    ];
    return data;
  }, []);

  const handleSelectChange = (val: string) => {
    if (!readOnly && onChange) onChange(val);
  };

  return (
    <Select
      showSearch
      allowClear={!required}
      placeholder={placeholder}
      onChange={handleSelectChange}
      value={value}
      disabled={disabled || readOnly}
      options={filteredOptions}
      optionFilterProp="label"
      filterOption={(input, option) =>
        typeof option?.label === 'string' &&
        option.label.toLowerCase().includes(input.toLowerCase())
      }
      style={{ width: '100%' }}
    />
  );
};

export default UnitGroupSelect;
