import axios from 'axios';
import { notifications } from '@mantine/notifications';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from './constants';
import setAuthToken from '../utils/setAuthToken';
import apis from '../apis';
import baseAxios from '../../../apis/baseAxios';

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await baseAxios.get('/user');

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });

    // dispatch({});
  } catch (err) {
    console.log(err);
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const login = (employeeID, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ employeeID, password });

  try {
    dispatch(setAuthLoading(true));
    const res = await baseAxios.post(apis.login, body, config);
    await dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    if (err.response) {
      const errors = err.response.data.errors;
      console.log('errors', errors);
      errors.forEach((error) =>
        // dispatch(setLoginSnackbarStatus(true, error.msg, 'error'))
        notifications.show({
          title: 'Error',
          message: error.msg,
          color: 'red',
        })
      );
    } else {
      notifications.show({
        title: 'Error',
        message: 'Something went wrong',
        color: 'red',
      });
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  } finally {
    dispatch(setAuthLoading(false));
  }
};

// Logout
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};

export const setAuthLoading = (loading) => (dispatch) => {
  dispatch({
    type: 'SET_AUTH_LOADING',
    payload: loading,
  });
};
