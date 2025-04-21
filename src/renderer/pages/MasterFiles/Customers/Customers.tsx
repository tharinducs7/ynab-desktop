// src/pages/UnitOfMeasurement.tsx
import React from 'react';
import type { ColumnsType } from 'antd/es/table';
import DataTable from '../../../components/DataTable/DataTable';
import ActionDropdown from '../../../components/DataTable/ActionDropdown';
import { CUSTOMER_TYPE } from '../../../types/customer';
import PriceDisplay from '../../../components/Common/PriceDisplay';
import CustomerDrawer from './CustomerDrawer';
import DisplayContactNumber from '../../../components/Common/DisplayContactNumber';
import ImageNameAvatar from '../../../components/Common/ImageNameAvatar';

const Customers: React.FC = () => {
  const URL: string = '/customers';
  // 2) Tell TS these columns are for UOM_TYPE
  const userColumns: ColumnsType<CUSTOMER_TYPE> = [
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
      sorter: (a: CUSTOMER_TYPE, b: CUSTOMER_TYPE) =>
        a.name.localeCompare(b.name),
      render: (_: any, record: CUSTOMER_TYPE) => (
        // <NameAvatar name={record.name} />
        <ImageNameAvatar name={record.name} size={40} />
      ),
    },
    {
      title: 'Contact',
      dataIndex: 'mobile_number',
      key: 'mobile_number',
      // client-side string compare
      // sorter: (a, b) => a?.symbol.localeCompare(b?.symbol),
      sortDirections: ['ascend', 'descend'],
      render: (_: any, record: any) => (
        <DisplayContactNumber contactNumber={record?.mobile_number} />
      ),
    },
    {
      title: <div style={{ textAlign: 'right' }}>Credit Balance</div>,
      key: 'credit_balance',
      dataIndex: 'credit_balance',
      className: 'text-right',
      width: 180,
      render: (_: any, record: any) => (
        <PriceDisplay value={record?.credit_balance} />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 40,
      fixed: 'right',
      render: (_: any, record: CUSTOMER_TYPE) => (
        <ActionDropdown<CUSTOMER_TYPE>
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
    <div className="unit_of_measurement">
      <DataTable<CUSTOMER_TYPE>
        apiEndpoint={URL}
        columns={userColumns}
        rowKey="id"
        defaultPageSize={10}
      />

      <CustomerDrawer />
    </div>
  );
};

export default Customers;
