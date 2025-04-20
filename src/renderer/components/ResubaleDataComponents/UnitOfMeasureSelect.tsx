/* eslint-disable react/require-default-props */
import React, { useMemo } from 'react';
import { Select } from 'antd';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import apiClient from '../../utils/apiClient';

interface Unit {
  value: number;
  label: string;
  icon: string;
  symbol: string;
}

interface Props {
  value?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  placeholder?: string;
}

const fetchUnits = async (): Promise<Unit[]> => {
  const res = await apiClient.get('/unit_of_measures-dropdown');
  return res.data?.data || [];
};

const UnitOfMeasureSelect: React.FC<Props> = ({
  value,
  onChange,
  disabled,
  readOnly,
  required = true,
  placeholder = 'Select Unit of Measure',
}) => {
  const { data = [], isLoading } = useQuery<Unit[], Error>({
    queryKey: ['unit-of-measures'],
    queryFn: fetchUnits,
    staleTime: 30 * 60 * 1000, // 30 min cache
  } as UseQueryOptions<Unit[], Error>);

  const options = useMemo(
    () =>
      data.map((u) => ({
        value: u.value,
        label: (
          <>
            {u.icon} {u.label}
            <span
              style={{
                fontStyle: 'italic',
                fontWeight: 'bold',
                marginLeft: '0.2em',
                display: 'inline-block',
              }}
            >
              ({u.symbol})
            </span>
          </>
        ),
      })),
    [data],
  );

  const selectedOption = options.find((opt) => opt.value === value);

  const handleChange = (val: number) => {
    if (!readOnly && onChange) onChange(val);
  };

  return (
    <Select
      showSearch
      allowClear={!required}
      loading={isLoading}
      placeholder={placeholder}
      onChange={handleChange}
      value={selectedOption?.value}
      disabled={disabled || readOnly}
      style={{ width: '100%' }}
      optionFilterProp="label"
      filterOption={(input, option) =>
        typeof option?.label === 'string' &&
        typeof option?.label === 'string' &&
        (option.label as string).toLowerCase().includes(input.toLowerCase())
      }
      options={options}
    />
  );
};

export default UnitOfMeasureSelect;
