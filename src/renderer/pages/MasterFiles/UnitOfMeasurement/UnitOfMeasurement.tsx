// src/pages/UnitOfMeasurement.tsx
import React from 'react';
import type { ColumnsType } from 'antd/es/table';
import DataTable from '../../../components/DataTable/DataTable';
import ActionDropdown from '../../../components/DataTable/ActionDropdown';
import UnitOfMeasureDrawer from './UnitOfMeasureDrawer';
import { UOM_TYPE } from '../../../types/uom';

const UnitOfMeasurement: React.FC = () => {
  const URL: string = '/unit_of_measures';
  // 2) Tell TS these columns are for UOM_TYPE
  const userColumns: ColumnsType<UOM_TYPE> = [
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
      render: (_: any, record: UOM_TYPE) => (
        <ActionDropdown<UOM_TYPE>
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
      <DataTable<UOM_TYPE>
        apiEndpoint={URL}
        columns={userColumns}
        rowKey="id"
        defaultPageSize={10}
      />

      <UnitOfMeasureDrawer />
    </div>
  );
};

export default UnitOfMeasurement;
