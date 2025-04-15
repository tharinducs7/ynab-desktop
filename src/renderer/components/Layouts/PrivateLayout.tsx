// renderer/components/Layout/PrivateLayout.tsx
import React from 'react';
import { Layout, Menu } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  DashboardOutlined,
  AppstoreOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const PrivateLayout: React.FC = () => {
  const navigate = useNavigate();

  // Sample menu items. Customize keys, icons, and labels per your ERP modules.
  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: 'inventory',
      icon: <AppstoreOutlined />,
      label: 'Inventory',
    },
    {
      key: 'sales',
      icon: <ShoppingCartOutlined />,
      label: 'Sales',
    },
  ];

  const onMenuClick = ({ key }: { key: string }) => {
    // Customize navigation mapping as needed.
    navigate(key === 'dashboard' ? '/' : `/${key}`);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          background: '#001529',
          color: '#fff',
          fontSize: '20px',
          textAlign: 'center',
        }}
      >
        ERP Dashboard
      </Header>
      <Layout>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['dashboard']}
            style={{ height: '100%', borderRight: 0 }}
            items={menuItems}
            onClick={onMenuClick}
          />
        </Sider>
        <Layout style={{ padding: '24px' }}>
          <Content
            style={{
              background: '#fff',
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {/* Nested content is rendered here */}
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default PrivateLayout;
