// renderer/pages/Auth/Login.tsx
import React, { useState } from 'react';
import { Form, Input, Button, Typography, Layout, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Sider from 'antd/es/layout/Sider';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const { Content } = Layout;
const { Text } = Typography;

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    setError(null);
    try {
      await login(values.email, values.password);
      navigate('/home/dashboard');
    } catch (err: any) {
      // Extract and display a string message only
      const errorMessage =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        'Login failed. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: '98vh' }}>
      <Content style={{ background: '#18cb96' }}>dd</Content>
      <Sider width="500px" style={{ background: '#fff' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            borderRadius: 0,
            border: '4px solid #18cb96',
          }}
        >
          <Form
            form={form}
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="horizontal"
            style={{ width: '100%', padding: '2rem' }}
            size="large"
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  type: 'email',
                  message: 'Please input a valid email!',
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </Form.Item>

            {/* Show error message if exists */}
            {error && (
              <Form.Item>
                <Alert message={error} type="error" showIcon closable />
              </Form.Item>
            )}

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                Sign In
              </Button>
            </Form.Item>

            <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
              <Text type="secondary">
                No account yet? Reach out to your administrator for assistance
                with setup.
              </Text>
            </div>
          </Form>
        </div>
      </Sider>
    </Layout>
  );
};

export default LoginPage;
