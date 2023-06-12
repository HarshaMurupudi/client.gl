import React, { lazy, Suspense } from 'react';

// import Home from '../pages/home';

import AppLayout from '../components/layouts/AppLayout';

const Home = lazy(() => import('../pages/home'));

export const publicRoutes = [
  {
    path: '/',
    element: (
      <AppLayout>
        <Home />
      </AppLayout>
    ),
  },
];
