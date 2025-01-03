import axios from 'axios';

axios.interceptors.request.use((config) =>{
 
    // Enter generated access token here
    const accessToken =
      'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huX2RvZSIsImV4cCI6MTczNTg5MDc0NCwiaWF0IjoxNzM1ODg3MTQ0fQ.Gd4CgrQWgHpx7kgeOpxWp-GkY12l_zFpupjAJVsWT38';

    config.headers.Authorization = accessToken;
    return config;
}
);

export const axiosPrivate = axios;