// renderer/PrivateRoute.tsx
import React, { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { authData } = useAuth();
  return authData ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
