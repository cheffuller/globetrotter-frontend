import axios from 'axios';
import { JWT_TOKEN } from '../consts/JwtConst';

axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem(JWT_TOKEN);
    console.log(accessToken);
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  (error) => {
    console.log("Error with JWT token.");
    localStorage.removeItem(JWT_TOKEN);
    return Promise.reject(error);
  }
);

export const axiosPrivate = axios;
