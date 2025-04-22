/* eslint-disable react/require-default-props */
import React, { useMemo } from 'react';
import { Select } from 'antd';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import apiClient from '../../utils/apiClient';

interface ParentCategory {
  value: number;
  label: string;
}

interface ParentCategorySelectProps {
  value?: number;
  onChange?: (value: number | undefined) => void;
  disabled?: boolean;
  readOnly?: boolean;
  placeholder?: string;
}

const fetchParentCategories = async (): Promise<ParentCategory[]> => {
  const res = await apiClient.get('/categories-parents');
  return res.data?.data || [];
};

const ParentCategorySelect: React.FC<ParentCategorySelectProps> = ({
  value,
  onChange,
  disabled,
  readOnly,
  placeholder = 'Select Parent Category',
}) => {
  const { data = [], isLoading } = useQuery<ParentCategory[], Error>({
    queryKey: ['parent-categories'],
    queryFn: fetchParentCategories,
    staleTime: 30 * 60 * 1000, // 30 minutes
  } as UseQueryOptions<ParentCategory[], Error>); // explicitly cast for safety

  const filteredOptions = useMemo(
    () =>
      data.map((item: ParentCategory) => ({
        label: item.label,
        value: item.value,
      })),
    [data],
  );

  const selectedOption = filteredOptions.find((opt) => opt.value === value);

  const handleSelectChange = (val: number | null) => {
    if (!readOnly && onChange) onChange(val || undefined);
  };

  return (
    <Select
      showSearch
      allowClear
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

export default ParentCategorySelect;
