import axios from 'axios';

axios.interceptors.request.use((config) =>{
 
    // Enter generated access token here
    const accessToken =
      '';

    config.headers.Authorization = accessToken;
    return config;
}
);

export const axiosPrivate = axios;