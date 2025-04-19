// renderer/AppRoutes.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

import Login from '../pages/Auth/Login';
import PrivateLayout from '../components/Layouts/PrivateLayout';
import Dashboard from '../pages/Dashboard/Dashboard';
import NotFound from '../pages/Errors/NotFound';
import UnitOfMeasurement from '../pages/MasterFiles/UnitOfMeasurement/UnitOfMeasurement';
import Banks from '../pages/MasterFiles/Banks/Banks';
import Vehicles from '../pages/MasterFiles/Vehicles/Vehicles';
import Items from '../pages/MasterFiles/Items/Items';

const AppRoutes: React.FC = () => {
  const { authData } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* wrap all private routes in a single guard */}
      <Route
        path="/*"
        element={
          authData ? <PrivateLayout /> : <Navigate to="/login" replace />
        }
      >
        {/* index = "/" */}
        <Route index element={<Dashboard />} />
        {/* "/home/dashboard" */}
        <Route path="home/dashboard" element={<Dashboard />} />

        <Route
          path="master_file/unit_of_measures"
          element={<UnitOfMeasurement />}
        />

        <Route path="master_file/banks" element={<Banks />} />
        <Route path="master_file/items" element={<Items />} />
        <Route path="vehicles-management/vehicles" element={<Vehicles />} />
        {/* any other unmatched under "/" */}
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* catch-all for truly unknown paths */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
