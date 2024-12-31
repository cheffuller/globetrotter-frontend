import axios from 'axios';

axios.interceptors.request.use((config) =>{
 
    // Enter generated access token here
    const accessToken =
      'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huX2RvZSIsImV4cCI6MTczNTY2OTUyOCwiaWF0IjoxNzM1NjY1OTI4fQ.P38ndGPhZdzi1FDadH4V-EUyvwtujHmUXu3wRE1hz4Q';

    config.headers.Authorization = accessToken;
    return config;
}
);

export const axiosPrivate = axios;