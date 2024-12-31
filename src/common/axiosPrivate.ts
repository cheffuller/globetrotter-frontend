import axios from 'axios';

axios.interceptors.request.use((config) =>{
 
    // Enter generated access token here
    const accessToken =
      'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huX2RvZSIsImV4cCI6MTczNTY2NzcwMywiaWF0IjoxNzM1NjY0MTAzfQ.neVZjRMltdDrIMkseYZ1HCoxT3MmprIyOhX72uCsGYo';

    config.headers.Authorization = accessToken;
    return config;
}
);

export const axiosPrivate = axios;