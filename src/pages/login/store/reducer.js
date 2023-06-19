import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from './constants';

const initalState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: false,
  authLoading: false,
  user: null,
};

const userReducer = (state = initalState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADING:
      return {
        ...state,
        ...payload,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case REGISTER_SUCCESS:
    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: true,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      localStorage.removeItem('visitedMission');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case 'SET_AUTH_LOADING':
      return {
        ...state,
        authLoading: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
