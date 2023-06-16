import React, { lazy, Suspense } from 'react';

import AppLayout from '../components/layouts/AppLayout';
import PrivateRoute from '../components/Utils/PrivateRoute';

const Home = lazy(() => import('../pages/home'));
const Login = lazy(() => import('../pages/login'));

export const publicRoutes = [
  {
    path: '/',
    element: (
      <PrivateRoute>
        <AppLayout>
          <Home />
        </AppLayout>
      </PrivateRoute>
    ),
  },
  {
    path: '/login',
    element: <Login />,
  },
];
