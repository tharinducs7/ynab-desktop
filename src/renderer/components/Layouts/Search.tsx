/* eslint-disable react/require-default-props */
import React, { useState, useMemo } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import debounce from 'lodash/debounce';

const { Search: AntdSearch } = Input;

interface SearchProps {
  /** Placeholder text shown in the input */
  placeholder?: string;
  /** Called when the user presses Enter or (optionally) after debounce */
  onSearch: (value: string) => void;
  /** Debounce delay in milliseconds; set to 0 to disable */
  debounceTime?: number;
  /** Whether to show the built‑in search button */
  enterButton?: boolean | React.ReactNode;
}

const Search: React.FC<SearchProps> = ({
  placeholder = 'Search...',
  onSearch,
  debounceTime = 300,
  enterButton = false,
}) => {
  const [value, setValue] = useState('');

  const debounced = useMemo(
    () => debounce((val: string) => onSearch(val), debounceTime!),
    [onSearch, debounceTime],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);
    if (debounceTime! > 0) debounced(val);
  };

  const handleSearch = (val?: string) => {
    debounced.cancel();
    onSearch(val ?? value);
  };

  if (enterButton) {
    return (
      <AntdSearch
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        onSearch={handleSearch}
        enterButton={enterButton}
        allowClear
      />
    );
  }

  return (
    <Input
      value={value}
      placeholder={placeholder}
      prefix={<SearchOutlined />}
      allowClear
      onChange={handleChange}
      onPressEnter={() => handleSearch()}
    />
  );
};

export default Search;
