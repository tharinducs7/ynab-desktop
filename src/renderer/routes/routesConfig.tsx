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
// Here we wrap our protected routes under a common layout (e.g. sidebar, header, etc.).
export const privateRoutes: RouteConfig[] = [
  {
    path: '/',
    element: <PrivateLayout />,
    auth: true,
    children: [
      { path: '', element: <Dashboard /> },
      // More modules can be added here...
    ],
  },
];
