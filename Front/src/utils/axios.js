import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
});

axiosInstance.interceptors.response.use(
  response => response,
  error => Promise.reject((error.response && error.response.data) || 'Something went wrong'),
  config => config.headers['Access-Control-Max-Age'] = 86400,
);

export default axiosInstance;
