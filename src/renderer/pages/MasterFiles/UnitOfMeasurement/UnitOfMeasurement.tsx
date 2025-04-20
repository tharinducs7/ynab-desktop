// src/pages/UnitOfMeasurement.tsx
import React from 'react';
import type { ColumnsType } from 'antd/es/table';
import DataTable from '../../../components/DataTable/DataTable';
import ActionDropdown from '../../../components/DataTable/ActionDropdown';
import UnitOfMeasureDrawer from './UnitOfMeasureDrawer';

// 1) Define your row type
interface UOM {
  id: string; // comes from API as string
  name: string;
  description: string;
  category: string;
  symbol: string;
  icon: string;
  // ...other fields if needed
}

const UnitOfMeasurement: React.FC = () => {
  const URL: string = '/unit_of_measures';
  // 2) Tell TS these columns are for UOM
  const userColumns: ColumnsType<UOM> = [
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
      dataIndex: 'category',
      key: 'category',
      width: 200,
      // client-side string compare
      // sorter: (a, b) => a?.category.localeCompare(b?.category),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Name',
      dataIndex: 'full_name',
      key: 'full_name',
      // width: 100,
      // client-side string compare
      // sorter: (a, b) => a?.name.localeCompare(b?.name),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Symbol',
      dataIndex: 'symbol',
      key: 'symbol',
      // client-side string compare
      // sorter: (a, b) => a?.symbol.localeCompare(b?.symbol),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Icon',
      dataIndex: 'icon',
      key: 'icon',
      // client-side string compare
      // sorter: (a, b) => a?.icon.localeCompare(b?.icon),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 40,
      fixed: 'right',
      render: (_: any, record: UOM) => (
        <ActionDropdown<UOM>
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
      <DataTable<UOM>
        apiEndpoint={URL}
        columns={userColumns}
        rowKey="id"
        defaultPageSize={20}
      />

      <UnitOfMeasureDrawer />
    </div>
  );
};

export default UnitOfMeasurement;
