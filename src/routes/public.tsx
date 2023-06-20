import React, { lazy, Suspense } from 'react';

import AppLayout from '../components/layouts/AppLayout';
import PrivateRoute from '../components/Utils/PrivateRoute';

const Home = lazy(() => import('../pages/home'));
const Login = lazy(() => import('../pages/login'));
const Mission = lazy(() => import('../pages/mission'));
const Contracts = lazy(() => import('../pages/contracts'));
const Operations = lazy(() => import('../pages/operations'));

export const publicRoutes = [
  {
    path: '/',
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <div>Dashboard</div>
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: '/delivery-queue',
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <Home />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: '/contracts',
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <Contracts />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: '/operations',
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <Operations />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/mission',
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          {/* <AppLayout> */}
          <Mission />
          {/* </AppLayout> */}
        </PrivateRoute>
      </Suspense>
    ),
  },
];
