// renderer/routesConfig.tsx
import React, { JSX } from 'react';
import Login from '../pages/Auth/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import PrivateLayout from '../components/Layouts/PrivateLayout';

export interface RouteConfig {
  path: string;
  element: JSX.Element;
  auth?: boolean; // if true, the route is private.
  children?: RouteConfig[];
}

// Public routes: no authentication required.
export const publicRoutes: RouteConfig[] = [
  {
    path: '/login',
    element: <Login />,
    auth: false,
  },
];

// Private routes: user must be authenticated.
// This nests the Dashboard route under the PrivateLayout.
export const privateRoutes: RouteConfig[] = [
  {
    path: '/',
    element: <PrivateLayout />,
    auth: true,
    children: [
      { path: '', element: <Dashboard /> },
      { path: 'home/dashboard', element: <Dashboard /> },
      // ... add other private module routes here.
    ],
  },
];
