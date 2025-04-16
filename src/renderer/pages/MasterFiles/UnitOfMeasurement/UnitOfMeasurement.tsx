// src/pages/UnitOfMeasurement.tsx
import React from 'react';
import { Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import DataTable from '../../../components/DataTable/DataTable';
import ActionDropdown from '../../../components/DataTable/ActionDropdown';
import { useAppContext } from '../../../contexts/AppContext';
import AppDrawer from '../../../components/AppDrawer/AppDrawer';

// 1) Define your row type
interface UOM {
  id: string; // comes from API as string
  name: string;
  // ...other fields if needed
}

const UnitOfMeasurement: React.FC = () => {
  const { drawerMode, closeDrawer } = useAppContext();
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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      // client-side string compare
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 50,
      fixed: 'right',
      render: (_: any, record: UOM) => (
        <ActionDropdown<UOM>
          data={record}
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

      <AppDrawer
        onSubmit={() => {
          console.log('submit in mode', drawerMode);
          closeDrawer();
        }}
        extraFooterButtons={
          drawerMode === 'edit_mode' ? <Button danger>Delete</Button> : null
        }
      >
        {drawerMode === 'create_mode' && <div>Create form...</div>}
        {drawerMode === 'edit_mode' && <div>Edit form...</div>}
        {drawerMode === 'view_mode' && <div>Read‐only view...</div>}
      </AppDrawer>
    </div>
  );
};

export default UnitOfMeasurement;
