import { Button } from 'antd';
import DataTable from '../../components/DataTable/DataTable';
import ActionDropdown from '../../components/DataTable/ActionDropdown';
import { useAppContext } from '../../contexts/AppContext';
import AppDrawer from '../../components/AppDrawer/AppDrawer';

const Dashbord = () => {
  const { openDrawer, drawerMode, closeDrawer } = useAppContext();

  const userColumns = [
    { title: 'Id', dataIndex: 'id', key: 'id', width: 100 },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    {
      title: 'Actions',
      key: 'actions',
      width: 50,
      fixed: 'right' as 'right',
      render: (_: any, record: unknown) => (
        <ActionDropdown<any>
          data={record}
          onAction={(action, menuId, item) => {
            // handle action
            console.log({ action, menuId, item });
          }}
        />
      ),
    },
  ];

  return (
    <div className="dashboard">
      {/* <h1>Dashboard</h1>
      <p>Welcome to the dashboard!</p> */}
      <DataTable
        apiEndpoint="/items"
        columns={userColumns}
        rowKey="userId"
        defaultPageSize={20}
      />

      <Button onClick={() => openDrawer('create_mode')}>New Item</Button>
      <Button onClick={() => openDrawer('edit_mode')}>Edit Item</Button>
      <AppDrawer
        onSubmit={() => {
          // handle submit for create/edit/view
          console.log('submit in mode', drawerMode);
          closeDrawer();
        }}
        extraFooterButtons={
          drawerMode === 'edit_mode' ? <Button danger>Delete</Button> : null
        }
      >
        {/* content here will scroll if too tall */}
        {drawerMode === 'create_mode' && <div>Create form...</div>}
        {drawerMode === 'edit_mode' && <div>Edit form...</div>}
        {drawerMode === 'view_mode' && <div>Read‐only view...</div>}
      </AppDrawer>
    </div>
  );
};

export default Dashbord;
