/* eslint-disable react/require-default-props */
import React, { useMemo } from 'react';
import { Select } from 'antd';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import apiClient from '../../utils/apiClient';

interface Category {
  value: number;
  label: string;
}

interface CategorySelectProps {
  value?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  placeholder?: string;
}

const fetchCategories = async (): Promise<Category[]> => {
  const res = await apiClient.get('/categories-parents');
  return res.data?.data || [];
};

const CategorySelect: React.FC<CategorySelectProps> = ({
  value,
  onChange,
  disabled,
  readOnly,
  required = true,
  placeholder = 'Select Category',
}) => {
  const { data = [], isLoading } = useQuery<Category[], Error>({
    queryKey: ['categories-parents'],
    queryFn: fetchCategories,
    staleTime: 30 * 60 * 1000, // 30 minutes
    // `cacheTime` is not a valid key in this context — removed
  } as UseQueryOptions<Category[], Error>); // explicitly cast for safety

  const filteredOptions = useMemo(
    () =>
      data.map((item: Category) => ({
        label: item.label,
        value: item.value,
      })),
    [data],
  );

  const selectedOption = filteredOptions.find((opt) => opt.value === value);

  const handleSelectChange = (val: number) => {
    if (!readOnly && onChange) onChange(val);
  };

  return (
    <Select
      showSearch
      allowClear={!required}
      loading={isLoading}
      placeholder={placeholder}
      onChange={handleSelectChange}
      value={selectedOption?.value}
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

export default CategorySelect;
