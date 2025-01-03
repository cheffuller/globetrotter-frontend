import axios from 'axios';

axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('jwtToken');

    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const axiosPrivate = axios;
