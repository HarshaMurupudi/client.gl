import React, { useState, useEffect } from 'react';
import { MantineProvider, Button } from '@mantine/core';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Notifications } from '@mantine/notifications';

import { AppRoutes } from './routes';
import store from './store';
import { loadUser } from './pages/login/store/actions';

import "react-datepicker/dist/react-datepicker.css";

function App() {
  const [userAuthLoadStatus, setUserAuthLoadStatus] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      await store.dispatch(loadUser());
    };

    fetchData();
    setUserAuthLoadStatus(true);
  }, []);

  const renderApp = () => {
    if (userAuthLoadStatus) {
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
            <Notifications />
          </MantineProvider>
        </Provider>
      );
    } else {
      return <></>;
    }
  };

  return renderApp();
}

export default App;
