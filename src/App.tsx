import React from 'react';
import { MantineProvider, Button } from '@mantine/core';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import { AppRoutes } from './routes';
import store from './store';

import './App.css';

function App() {
  return (
    <Provider store={store}>
      <MantineProvider
        theme={{ fontFamily: 'Open Sans' }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Router>
          <AppRoutes />
        </Router>
      </MantineProvider>
    </Provider>
  );
}

export default App;
