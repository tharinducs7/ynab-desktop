// src/pages/UnitOfMeasurement.tsx
import React from 'react';
import type { ColumnsType } from 'antd/es/table';
import { Tag } from 'antd';
import { FolderOutlined } from '@ant-design/icons';
import DataTable from '../../../components/DataTable/DataTable';
import ActionDropdown from '../../../components/DataTable/ActionDropdown';
import { CATEGORY_TYPE } from '../../../types/categories';
import StatusIcon from '../../../components/Common/StatusIcon';
import CategoriesDrawer from './CategoriesDrawer';

const Categories: React.FC = () => {
  const URL: string = '/categories';
  // 2) Tell TS these columns are for CATEGORY_TYPE
  const userColumns: ColumnsType<CATEGORY_TYPE> = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      width: 60,
      // 3) Sort numerically by casting to Number
      sorter: (a, b) => Number(a.id) - Number(b.id),
      sortDirections: ['ascend', 'descend'],
      // 4) Render as a number
      render: (val: string) => Number(val),
    },
    {
      title: 'Category',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      // client-side string compare
      // sorter: (a, b) => a?.category.localeCompare(b?.category),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Parent Category',
      dataIndex: 'parent_name',
      key: 'parent_name',
      width: 200,
      // client-side string compare
      // sorter: (a, b) => a?.category.localeCompare(b?.category),
      sortDirections: ['ascend', 'descend'],
      render: (parentName) => {
        if (!parentName) {
          return (
            <Tag color="blue" icon={<FolderOutlined />}>
              Parent Category
            </Tag>
          );
        }
        return parentName;
      },
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      // width: 100,
      // client-side string compare
      // sorter: (a, b) => a?.name.localeCompare(b?.name),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: (
        <small style={{ textAlign: 'right', fontSize: '0.60em' }}>Status</small>
      ),
      dataIndex: 'is_active',
      key: 'is_active',
      align: 'center',
      render: (status: number) => <StatusIcon status={status} />,
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 40,
      fixed: 'right',
      render: (_: any, record: CATEGORY_TYPE) => (
        <ActionDropdown<CATEGORY_TYPE>
          data={record}
          apiEndpoint={URL}
          onAction={(action, menuId, item) => {
            console.log({ action, menuId, item });
          }}
        />
      ),
    },
  ];

  return (
    <div className="category">
      <DataTable<CATEGORY_TYPE>
        apiEndpoint={URL}
        columns={userColumns}
        rowKey="id"
        defaultPageSize={10}
      />

      <CategoriesDrawer />
    </div>
  );
};

export default Categories;
