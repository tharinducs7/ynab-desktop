// src/pages/UnitOfMeasurement.tsx
import React from 'react';
import type { ColumnsType } from 'antd/es/table';
import { Tag } from 'antd';
import DataTable from '../../../components/DataTable/DataTable';
import ActionDropdown from '../../../components/DataTable/ActionDropdown';
import QuantityWithUnit from '../../../components/Common/QuantityWithUnit';
import PriceDisplay from '../../../components/Common/PriceDisplay';
import ItemsDrawer from './ItemsDrawer';
import { ITEM } from '../../../types/item';
// import { useAppContext } from '../../../contexts/AppContext';

const Items: React.FC = () => {
  const URL: string = '/items';
  // const { setLoadingDrawer, loadingDrawer} = useAppContext();
  // 2) Tell TS these columns are for UOM
  const userColumns: ColumnsType<ITEM> = [
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
      title: 'Qty',
      key: 'quantity',
      dataIndex: 'quantity',
      width: 80,
      render: (_: any, record: ITEM) => (
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
      width: 100,
      align: 'right',
      sorter: (a, b) => a.damage_quantity - b.damage_quantity,
      render: (qty: number) => {
        let color = 'green';
        if (qty > 10) color = 'red';
        else if (qty > 0) color = 'gold';

        const formattedQty = qty.toLocaleString('en-US');

        return <Tag color={color}>{formattedQty}</Tag>;
      },
    },
    {
      title: <div style={{ textAlign: 'right' }}>Cost Price</div>,
      key: 'batch_cost_price',
      dataIndex: 'batch_cost_price',
      className: 'text-right',
      width: 200,
      render: (_: any, record: ITEM) => (
        <PriceDisplay value={record.batch_cost_price} />
      ),
    },
    {
      title: <div style={{ textAlign: 'right' }}>Discount</div>,
      key: 'discount_amount',
      dataIndex: 'discount_amount',
      className: 'text-right',
      width: 200,
      render: (_: any, record: ITEM) => (
        <PriceDisplay value={record.discount_amount} />
      ),
    },
    {
      title: <div style={{ textAlign: 'right' }}>Selling Price</div>,
      key: 'batch_selling_price',
      dataIndex: 'batch_selling_price',
      className: 'text-right',
      width: 200,
      render: (_: any, record: ITEM) => (
        <PriceDisplay value={record.batch_selling_price} />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 50,
      fixed: 'right',
      render: (_: any, record: ITEM) => (
        <ActionDropdown<ITEM>
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
      <DataTable<ITEM>
        apiEndpoint={URL}
        columns={userColumns}
        rowKey="id"
        defaultPageSize={20}
      />

      <ItemsDrawer />
    </div>
  );
};

export default Items;
