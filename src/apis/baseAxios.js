import axios from "axios";

const localAxios = axios.create({
  baseURL: process.env.REACT_APP_API_LOCAL_BASE_URL,
});

export default axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

const oldAxios = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL_OLD,
});

export { localAxios, oldAxios };
