import React, { lazy, Suspense } from 'react';

import AppLayout from '../components/layouts/AppLayout';
import PrivateRoute from '../components/Utils/PrivateRoute';

const Home = lazy(() => import('../pages/home'));
const Login = lazy(() => import('../pages/login'));
const Mission = lazy(() => import('../pages/mission'));
const Contracts = lazy(() => import('../pages/contracts'));
const Operations = lazy(() => import('../pages/operations'));
const PO = lazy(() => import('../pages/po'));
const Tracking = lazy(() => import('../pages/tracking'));
const Dashboard = lazy(() => import('../pages/dashboard'));
const PendingJobs = lazy(() => import('../pages/pending'));

export const publicRoutes = [
  {
    path: '/',
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <Dashboard />
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
    path: '/po',
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <PO />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: '/tracking',
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <Tracking />
          </AppLayout>
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: '/pending-jobs',
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PrivateRoute>
          <AppLayout>
            <PendingJobs />
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
