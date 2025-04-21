// src/pages/UnitOfMeasurement.tsx
import React from 'react';
import type { ColumnsType } from 'antd/es/table';
import { Tag } from 'antd';
import DataTable from '../../../components/DataTable/DataTable';
import ActionDropdown from '../../../components/DataTable/ActionDropdown';
import QuantityWithUnit from '../../../components/Common/QuantityWithUnit';
import PriceDisplay from '../../../components/Common/PriceDisplay';
import ItemsDrawer from './ItemsDrawer';
import { ITEM_TYPE } from '../../../types/item';
import StatusIcon from '../../../components/Common/StatusIcon';

const Items: React.FC = () => {
  const URL: string = '/items';

  const userColumns: ColumnsType<ITEM_TYPE> = [
    {
      title: 'Item Code',
      dataIndex: 'item_code',
      key: 'item_code',
      width: 120,
      // client-side string compare
      sorter: (a, b) => a.item_code.localeCompare(b.item_code),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      // client-side string compare
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Category',
      dataIndex: 'category_name',
      key: 'category_name',
      // client-side string compare
      sorter: (a, b) => a.category_name?.localeCompare(b?.category_name),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Warranty',
      dataIndex: 'warranty',
      key: 'warranty',
      sorter: (a, b) => a.warranty?.localeCompare(b?.warranty),
      sortDirections: ['ascend', 'descend'],
      render: (warranty: string | null | undefined) =>
        warranty || <Tag color="magenta">N/A</Tag>,
    },
    {
      title: (
        <small style={{ textAlign: 'right', fontSize: '0.70em' }}>
          Quantity
        </small>
      ),
      key: 'quantity',
      dataIndex: 'quantity',
      width: 130,
      align: 'right',
      className: 'text-right',
      render: (_: any, record: ITEM_TYPE) => (
        <QuantityWithUnit
          value={record.quantity}
          unit={record.unit_of_measure_symbol}
          fullName={record.unit_of_measure_full_name}
          boldValue
        />
      ),
    },
    {
      title: (
        <small style={{ textAlign: 'right', fontSize: '0.70em' }}>
          Damage Qty
        </small>
      ),
      dataIndex: 'damage_quantity',
      key: 'damage_quantity',
      width: 130,
      align: 'right',
      sorter: (a, b) => a.damage_quantity - b.damage_quantity,
      render: (_: any, record: ITEM_TYPE) => (
        <QuantityWithUnit
          value={record.damage_quantity}
          actual={record.quantity}
          unit={record.unit_of_measure_symbol}
          fullName={record.unit_of_measure_full_name}
          damaged
        />
      ),
    },
    {
      title: <div style={{ textAlign: 'right' }}>Cost Price</div>,
      key: 'batch_cost_price',
      dataIndex: 'batch_cost_price',
      className: 'text-right',
      width: 180,
      render: (_: any, record: ITEM_TYPE) => (
        <PriceDisplay value={record.batch_cost_price} />
      ),
    },
    {
      title: <div style={{ textAlign: 'right' }}>Discount</div>,
      key: 'discount_amount',
      dataIndex: 'discount_amount',
      className: 'text-right',
      width: 180,
      render: (_: any, record: ITEM_TYPE) => (
        <PriceDisplay value={record.discount_amount} />
      ),
    },
    {
      title: <div style={{ textAlign: 'right' }}>Selling Price</div>,
      key: 'batch_selling_price',
      dataIndex: 'batch_selling_price',
      className: 'text-right',
      width: 180,
      render: (_: any, record: ITEM_TYPE) => (
        <PriceDisplay value={record.batch_selling_price} />
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
      width: 50,
      fixed: 'right',
      render: (_: any, record: ITEM_TYPE) => (
        <ActionDropdown<ITEM_TYPE>
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
    <div className="items">
      <DataTable<ITEM_TYPE>
        apiEndpoint={URL}
        columns={userColumns}
        rowKey="id"
        defaultPageSize={10}
      />

      <ItemsDrawer />
    </div>
  );
};

export default Items;
