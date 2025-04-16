// renderer/contexts/AuthContext.tsx
import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
} from 'react';
import { message } from 'antd';
import httpClient from '../utils/httpClient';

// Define types for user and authentication data.
interface User {
  id: number;
  name: string;
  email: string;
  user_role_id: number;
  profile_image: string | null;
  phone_number: string;
  is_active: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

interface AuthData {
  user: User;
  token: string;
  permissionsAndModules: any[]; // Update with a more specific type if needed.
}

interface AuthContextProps {
  authData: AuthData | null;
  setAuthData: (data: AuthData | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  authData: null,
  setAuthData: () => {},
  login: async () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [authData, setAuthData] = useState<AuthData | null>(() => {
    const storedData = sessionStorage.getItem('authData');
    return storedData ? JSON.parse(storedData) : null;
  });

  // useEffect(() => {
  //   if (authData) {
  //     sessionStorage.setItem('authData', JSON.stringify(authData));
  //     sessionStorage.setItem('token', authData.token);
  //   } else {
  //     sessionStorage.removeItem('authData');
  //     sessionStorage.removeItem('token');
  //   }
  // }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response: any = await httpClient.post('/login', {
        email,
        password,
      });
      const { success, data } = response?.data ?? {};
      if (success) {
        message.success(`Welcome ${data.user.name}`);
        console.log('Login successful');
        setAuthData(data);
        sessionStorage.setItem('authData', JSON.stringify(data));
        sessionStorage.setItem('token', data.token);
        // Do not call window.location.href here; let the caller navigate.
      } else {
        message.error(response.response.data?.message || 'Login failed.');
        sessionStorage.removeItem('authData');
        sessionStorage.removeItem('token');
      }
    } catch (error) {
      // Log the error using a logging utility or handle it appropriately
      message.error('Login failed. Please try again.');
      throw error; // re-throw so caller can catch if needed.
    }
  }, []);

  const logout = useCallback(() => {
    setAuthData(null);
    message.info('Session timeout. Please login.');
    // Optionally, remove navigation here too.
    // We could let a component handle navigation instead.
  }, []);

  const value = useMemo(
    () => ({
      authData,
      setAuthData,
      login,
      logout,
    }),
    [authData, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
