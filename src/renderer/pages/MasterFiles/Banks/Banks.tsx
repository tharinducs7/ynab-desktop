// src/pages/UnitOfMeasurement.tsx
import React from 'react';
import type { ColumnsType } from 'antd/es/table';
import DataTable from '../../../components/DataTable/DataTable';
import ActionDropdown from '../../../components/DataTable/ActionDropdown';
import BanksDrawer from './BanksDrawer';
import { BASE_URL_ASSETS } from '../../../utils/httpClient';
import { BANK_TYPE } from '../../../types/bank';

const Banks: React.FC = () => {
  const URL: string = '/banks';
  // 2) Tell TS these columns are for UOM
  const userColumns: ColumnsType<BANK_TYPE> = [
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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend'],
      render: (_: any, record: BANK_TYPE & { logo: string }) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img
            src={`${BASE_URL_ASSETS}${record.logo}`}
            alt={record.name}
            style={{
              width: 32,
              height: 32,
              objectFit: 'cover',
              borderRadius: 4,
            }}
          />
          <span>{record.name}</span>
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 50,
      fixed: 'right',
      render: (_: any, record: BANK_TYPE) => (
        <ActionDropdown<BANK_TYPE>
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
      <DataTable<BANK_TYPE>
        apiEndpoint={URL}
        columns={userColumns}
        rowKey="id"
        defaultPageSize={20}
      />

      <BanksDrawer />
    </div>
  );
};

export default Banks;
