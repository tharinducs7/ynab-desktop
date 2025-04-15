// renderer/AppRoutes.tsx
import React, { JSX } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { publicRoutes, privateRoutes, RouteConfig } from './routesConfig';

/**
 * Recursively creates Route elements from a configuration array.
 */
const renderRoutes = (routes: RouteConfig[]): JSX.Element[] =>
  routes.map((route) => {
    const { path, element, children, auth } = route;
    // Wrap the element based on the auth flag.
    const routeElement = auth ? (
      <PrivateRoute>{element}</PrivateRoute>
    ) : (
      <PublicRoute>{element}</PublicRoute>
    );

    // Use the route's path as the key. If you need to ensure uniqueness, you can concatenate with an index.
    if (children && children.length > 0) {
      return (
        <Route key={path} path={path} element={routeElement}>
          {renderRoutes(children)}
        </Route>
      );
    }
    return <Route key={path} path={path} element={routeElement} />;
  });

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {renderRoutes(publicRoutes)}
      {renderRoutes(privateRoutes)}
      {/* Fallback: any unknown path navigates to default */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
