import axios from 'axios';

axios.interceptors.request.use((config) =>{
 
    // Enter generated access token here
    const accessToken =
      'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huX2RvZSIsImV4cCI6MTczNTY2MTk3NiwiaWF0IjoxNzM1NjU4Mzc2fQ.SNNFf9ozDjywo3pr9LDBq52c0p898_VdZLHhdVVkI3E';

    config.headers.Authorization = accessToken;
    return config;
}
);

export const axiosPrivate = axios;