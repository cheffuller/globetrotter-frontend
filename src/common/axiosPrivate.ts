import axios from 'axios';
import { JWT_TOKEN } from '../consts/JwtConst';

axios.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem(JWT_TOKEN);
        if (accessToken) {
            config.headers.Authorization = accessToken;
        }
        return config;
    },
    (error) => {
        localStorage.removeItem(JWT_TOKEN);
        return Promise.reject(error);
    }
);

export const axiosPrivate = axios;
