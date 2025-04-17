import React from 'react';
import { Layout, Popover, Dropdown, Avatar, Menu, Button, Flex } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  BellOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

import { useAuth } from '../../contexts/AuthContext';
import ERP_LOGO from '../../../../assets/logo-h.png';
import ERP_ICON_LOGO from '../../../../assets/icon.png';
import SideMenu from './SideMenu';
import { useAppContext } from '../../contexts/AppContext';

const { Header, Sider, Content } = Layout;

const PrivateLayout: React.FC = () => {
  const navigate = useNavigate();
  const { authData, logout } = useAuth();
  const { sidebarCollapsed, toggleSidebar, selectedMenuItem } = useAppContext();
  const userName = authData?.user?.name;
  // Define user menu actions.
  const handleUserMenuClick = (e: any) => {
    if (e.key === 'logout') {
      logout();
      navigate('/login');
    } else if (e.key === 'account') {
      navigate('/account');
    } else if (e.key === 'settings') {
      navigate('/settings');
    }
  };

  const userMenu = (
    <Menu onClick={handleUserMenuClick}>
      <Menu.Item key="account" icon={<UserOutlined />}>
        My Account
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        Settings
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: '100%' }}>
      {/* Header with logo and user actions */}
      <Header
        style={{
          background: '#fff',
          borderBottom: '1px solid #f0f0f0',
          padding: '0 14px',
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
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Flex
              style={{
                minWidth: sidebarCollapsed ? 80 : 290, // Ensure container is at least 260px wide
                display: 'flex', // Make sure it acts as a flex container
                justifyContent: 'space-between', // Push img and button to opposite ends
                alignItems: 'center', // Vertically center the inner elements
              }}
            >
              <img
                src={sidebarCollapsed ? ERP_ICON_LOGO : ERP_LOGO}
                alt="Logo"
                style={{
                  width: sidebarCollapsed ? 40 : 160,
                  height: sidebarCollapsed ? 40 : 'auto',
                  marginRight: sidebarCollapsed ? 6 : 0, // Optional spacing when not collapsed
                  transition: 'width 0.3s, height 0.3s', // Smooth transition for size change
                  marginLeft: sidebarCollapsed ? 0 : 0, // Optional spacing when not collapsed
                  // Remove marginRight since space-between distributes the items
                }}
              />
              <Button
                color="default"
                variant="outlined"
                onClick={toggleSidebar}
              >
                {sidebarCollapsed ? (
                  <MenuUnfoldOutlined />
                ) : (
                  <MenuFoldOutlined />
                )}
              </Button>
            </Flex>
            <Flex
              style={{
                display: 'flex',
                alignItems: 'center',
                marginLeft: 16, // Optional spacing between the two flex items
              }}
              className="font-poppins"
            >
              <span
                style={{ fontSize: 20, fontWeight: 'bold', color: '#001529' }}
              >
                {selectedMenuItem?.menu?.label || 'Dashboard'}
              </span>
            </Flex>
          </div>

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
      {/* Sidebar and content area */}
      <Layout>
        <Sider
          width={sidebarCollapsed ? 60 : 260}
          style={{ background: '#18cb96' }}
        >
          <SideMenu />
        </Sider>
        <Layout style={{ padding: '24px' }}>
          <Content
            style={{
              background: '#fff',
              padding: 24,
              margin: 0,
              minHeight: '85vh',
            }}
          >
            {/* Nested content will render here */}
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default PrivateLayout;
