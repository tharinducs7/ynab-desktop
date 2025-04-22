// src/pages/UnitOfMeasurement.tsx
import React from 'react';
import type { ColumnsType } from 'antd/es/table';
import DataTable from '../../../components/DataTable/DataTable';
import ActionDropdown from '../../../components/DataTable/ActionDropdown';
import { SERVICE_TYPE } from '../../../types/services';
import StatusIcon from '../../../components/Common/StatusIcon';
import PriceDisplay from '../../../components/Common/PriceDisplay';
// import CategoriesDrawer from './CategoriesDrawer';

const Services: React.FC = () => {
  const URL: string = '/services';
  // 2) Tell TS these columns are for CATEGORY_TYPE
  const userColumns: ColumnsType<SERVICE_TYPE> = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      width: 200,
      // client-side string compare
      // sorter: (a, b) => a?.category.localeCompare(b?.category),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      // client-side string compare
      // sorter: (a, b) => a?.category.localeCompare(b?.category),
      sortDirections: ['ascend', 'descend'],
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
      title: <div style={{ textAlign: 'right' }}>Cost Price</div>,
      key: 'cost_price',
      dataIndex: 'cost_price',
      className: 'text-right',
      width: 180,
      render: (_: any, record: SERVICE_TYPE) => (
        <PriceDisplay value={Number(record?.cost_price)} />
      ),
    },
    {
      title: <div style={{ textAlign: 'right' }}>Price</div>,
      key: 'price',
      dataIndex: 'price',
      className: 'text-right',
      width: 180,
      render: (_: any, record: SERVICE_TYPE) => (
        <PriceDisplay value={Number(record?.cost_price)} />
      ),
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
      render: (_: any, record: SERVICE_TYPE) => (
        <ActionDropdown<SERVICE_TYPE>
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
    <div className="services">
      <DataTable<SERVICE_TYPE>
        apiEndpoint={URL}
        columns={userColumns}
        rowKey="id"
        defaultPageSize={10}
      />

      {/* <CategoriesDrawer /> */}
    </div>
  );
};

export default Services;
