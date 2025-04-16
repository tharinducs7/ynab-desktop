/* eslint-disable react/require-default-props */
// src/components/DataTable/DataTable.tsx
import React, { useState, useMemo } from 'react';
import { Table, Input, Space, Button } from 'antd';
import type { TableProps, TablePaginationConfig } from 'antd';
import {
  SearchOutlined,
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import debounce from 'lodash/debounce';
import apiClient from '../../utils/apiClient';
import { useAppContext } from '../../contexts/AppContext';

interface DataTableProps<T> {
  /** API URL to fetch paginated data from */
  apiEndpoint: string;
  /** Antd Table columns definition */
  columns: TableProps<T>['columns'];
  /** Field in your data to use as the unique key */
  rowKey?: string;
  /** Initial page size */
  defaultPageSize?: number;
  /** Callback when the Create button is clicked */
}

interface ApiResponse<T> {
  data: T[];
  total: number;
}

const DataTable = <T extends Record<string, any>>({
  apiEndpoint,
  columns,
  rowKey = 'id',
  defaultPageSize = 10,
}: DataTableProps<T>) => {
  const [search, setSearch] = useState('');
  const { selectedMenuItem, openDrawer } = useAppContext();
  const perms = selectedMenuItem?.permissions;
  // const menuId = selectedMenuItem?.menuId;
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: defaultPageSize,
  });

  const debouncedSetSearch = useMemo(
    () => debounce((val: string) => setSearch(val), 300),
    [],
  );

  const { data, isLoading } = useQuery<ApiResponse<T>, Error>({
    queryKey: [apiEndpoint, search, pagination.current, pagination.pageSize],
    queryFn: async () => {
      const params = {
        search,
        page: pagination.current!,
        pageSize: pagination.pageSize!,
      };
      const response = await apiClient.get(apiEndpoint, {
        params,
      });
      return response.data;
    },
    staleTime: 300000, // 5 minutes
  });

  const handleTableChange: TableProps<T>['onChange'] = (pager) => {
    setPagination({
      current: pager.current,
      pageSize: pager.pageSize,
    });
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: 8,
          marginBottom: 16,
        }}
      >
        <Input
          prefix={<SearchOutlined />}
          suffix={isLoading ? <LoadingOutlined spin /> : undefined}
          placeholder="Search…"
          allowClear
          onChange={(e) => debouncedSetSearch(e.target.value)}
          style={{ width: 300 }}
          className="search-input"
        />
        {(perms?.can_create || perms?.can_create !== undefined) && (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => openDrawer('create_mode')}
            disabled={!perms.can_create}
          >
            Create
          </Button>
        )}
      </div>

      <Table<T>
        size="small"
        scroll={{ x: 'max-content' }}
        rowKey={rowKey}
        columns={columns}
        dataSource={data?.data}
        loading={isLoading}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: data?.total,
          showSizeChanger: false,
        }}
        onChange={handleTableChange}
      />
    </Space>
  );
};

export default DataTable;
