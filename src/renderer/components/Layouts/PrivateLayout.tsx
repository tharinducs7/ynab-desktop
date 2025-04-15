// renderer/components/Layout/PrivateLayout.tsx
import React from 'react';
import { Layout, Menu, Popover, Dropdown, Avatar } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { BellOutlined, UserOutlined } from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';
import SideMenu from './SideMenu';

const { Header, Sider, Content } = Layout;

const PrivateLayout: React.FC = () => {
  const navigate = useNavigate();
  const { authData, logout } = useAuth();
  // Get user details from authData; fallback if not available
  const userName = authData?.user?.name || 'Admin';
  // User dropdown menu actions
  const handleUserMenuClick = (e: any) => {
    if (e.key === 'logout') {
      logout();
    } else if (e.key === 'account') {
      navigate('/account');
    } else if (e.key === 'settings') {
      navigate('/settings');
    }
  };

  const userMenu = (
    <Menu onClick={handleUserMenuClick}>
      <Menu.Item key="account">My Account</Menu.Item>
      <Menu.Item key="settings">Settings</Menu.Item>
      <Menu.Item key="logout">Logout</Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Updated header with left logo and right user info */}
      <Header
        style={{
          background: '#fff',
          borderBottom: '1px solid #f0f0f0',
          padding: '0 24px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '64px',
          }}
        >
          {/* Left: Logo and application title */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="https://zfcthk.com/wp-content/uploads/2022/07/dummy-logo-4b.png"
              alt="Logo"
              style={{ height: 90, marginRight: 12 }}
            />
            <span
              style={{ fontSize: 20, fontWeight: 'bold', color: '#001529' }}
            >
              ERP Dashboard
            </span>
          </div>
          {/* Right: Notifications and user dropdown */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Popover content="No new notifications" placement="bottomRight">
              <BellOutlined
                style={{
                  fontSize: 20,
                  color: '#001529',
                  marginRight: 24,
                  cursor: 'pointer',
                }}
              />
            </Popover>
            <Dropdown overlay={userMenu} trigger={['click']}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  alignItems: 'flex-end',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar icon={<UserOutlined />} style={{ marginRight: 8 }} />
                  <span style={{ color: '#001529', fontSize: 16 }}>
                    {userName}
                  </span>
                </div>
              </div>
            </Dropdown>
          </div>
        </div>
      </Header>
      {/* Sidebar and Content */}
      <Layout>
        <Sider width={300} style={{ background: '#fff' }}>
          <SideMenu />
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
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default PrivateLayout;
