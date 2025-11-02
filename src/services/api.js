// Api Instance creation
import axios from 'axios';
const api = axios.create({
    baseURL:  'http://localhost:8000/api',
    withCredentials: true, // to send cookies with requests
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include access token in headers

api.interceptors.request.use(
    config => {
        const token = sessionStorage.getItem('accessToken');
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    error => Promise.reject(error));

export { api };