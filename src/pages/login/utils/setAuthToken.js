import baseAxios from '../../../apis/baseAxios';

const setAuthToken = (token) => {
  if (token) {
    baseAxios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete baseAxios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
