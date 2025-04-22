// src/pages/UnitOfMeasurement.tsx
import React from 'react';
import type { ColumnsType } from 'antd/es/table';
import DataTable from '../../../components/DataTable/DataTable';
import ActionDropdown from '../../../components/DataTable/ActionDropdown';
import { SUPPLIER_TYPE } from '../../../types/supplier';
import PriceDisplay from '../../../components/Common/PriceDisplay';
import DisplayContactNumber from '../../../components/Common/DisplayContactNumber';
import ImageNameAvatar from '../../../components/Common/ImageNameAvatar';
import SuppliersDrawer from './SuppliersDrawer';

const Suppliers: React.FC = () => {
  const URL: string = '/suppliers';
  // 2) Tell TS these columns are for UOM_TYPE
  const userColumns: ColumnsType<SUPPLIER_TYPE> = [
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
      sorter: (a: SUPPLIER_TYPE, b: SUPPLIER_TYPE) =>
        a.name.localeCompare(b.name),
      render: (_: any, record: SUPPLIER_TYPE) => (
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
      key: 'debit_balance',
      dataIndex: 'debit_balance',
      className: 'text-right',
      width: 180,
      render: (_: any, record: any) => (
        <PriceDisplay value={record?.debit_balance} />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 40,
      fixed: 'right',
      render: (_: any, record: SUPPLIER_TYPE) => (
        <ActionDropdown<SUPPLIER_TYPE>
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
    <div className="suppliers">
      <DataTable<SUPPLIER_TYPE>
        apiEndpoint={URL}
        columns={userColumns}
        rowKey="id"
        defaultPageSize={10}
      />

      <SuppliersDrawer />
    </div>
  );
};

export default Suppliers;
