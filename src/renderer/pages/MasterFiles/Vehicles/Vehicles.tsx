/* eslint-disable react/jsx-no-undef */
// src/pages/UnitOfMeasurement.tsx
import React from 'react';
import type { ColumnsType } from 'antd/es/table';
import DataTable from '../../../components/DataTable/DataTable';
import ActionDropdown from '../../../components/DataTable/ActionDropdown';
import VehicleLogoPopover from './VehicleLogoPopover';
// 1) Define your row type
interface UOM {
  id: string; // comes from API as string
  make: string;
  model: string;
  logo: string; // add logo field to match the expected type
  // ...other fields if needed
}

const Vehicles: React.FC = () => {
  const URL: string = '/vehicles';
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
      title: 'Make',
      dataIndex: 'make',
      key: 'make',
      sorter: (a, b) => a.make.localeCompare(b.make),
      sortDirections: ['ascend', 'descend'],
      render: (_: any, record: UOM & { logo: string }) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img
            src={record.logo}
            alt={record.make}
            style={{
              width: 32,
              // height: 32,
              objectFit: 'cover',
              borderRadius: 4,
            }}
          />
          <span>
            {record.make} {record.model}
          </span>
        </div>
      ),
    },
    {
      title: 'Logo',
      key: 'logo',
      dataIndex: 'logo',
      width: 80,
      render: (_: any, record: UOM) => (
        <VehicleLogoPopover make={record.make} model={record.model} />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 50,
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
    <div className="dashboard">
      <DataTable<UOM>
        apiEndpoint={URL}
        columns={userColumns}
        rowKey="id"
        defaultPageSize={20}
      />

      {/* <BanksDrawer /> */}
    </div>
  );
};

export default Vehicles;
