import axios from 'axios';

axios.interceptors.request.use((config) =>{
 
    // Enter generated access token here
    const accessToken =
      'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjbGFya19rZW50IiwiZXhwIjoxNzM1NjAxMjE5LCJpYXQiOjE3MzU1OTc2MTl9.nJ_P7qHaAaa3OthoQky6YpU7ZU-QAJMMGAsiDMwejB0';

    config.headers.Authorization = accessToken;
    return config;
}
);

export const axiosPrivate = axios;