// renderer/AppRoutes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Auth/Login';
import PrivateLayout from '../components/Layouts/PrivateLayout';
import Dashboard from '../pages/Dashboard/Dashboard';
import NotFound from '../pages/Errors/NotFound';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<PrivateLayout />}>
        {/* Default (index) route for "/" */}
        <Route index element={<Dashboard />} />
        {/* Nested route: URL "/home/dashboard" also renders the Dashboard */}
        <Route path="home/dashboard" element={<Dashboard />} />

        <Route path="*" element={<NotFound />} />
        {/* Add more nested routes as needed */}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
