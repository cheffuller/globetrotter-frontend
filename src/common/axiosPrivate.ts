import axios from 'axios';

axios.interceptors.request.use((config) =>{
 
    // Enter generated access token here
    const accessToken =
      'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huX2RvZSIsImV4cCI6MTczNTY2MjUzOCwiaWF0IjoxNzM1NjU4OTM4fQ.dNEc3Hyur30DyEu59ebhfttzl0skI2Gta8lzK_BaSHo';

    config.headers.Authorization = accessToken;
    return config;
}
);

export const axiosPrivate = axios;