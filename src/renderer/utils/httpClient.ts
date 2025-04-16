// renderer/utils/httpClient.ts
import axios from 'axios';
import { message } from 'antd';

// Set up the API base URL from an environment variable or fallback
const BASE_URL = 'https://sadunac.wysepos.com/api';

const httpClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Request interceptor: add Authorization header if a token exists
httpClient.interceptors.request.use(
  (config: any) => {
    const token = sessionStorage.getItem('token');
    console.log(token, 'token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    throw error;
  },
);

// Response interceptor: handle unauthorized errors globally
httpClient.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    if (error.response && error.response.status === 401) {
      console.log(window.location.pathname, 'window.location.pathname');

      sessionStorage.removeItem('token');
      sessionStorage.removeItem('authData');

      // Use setTimeout to defer side-effects out of the render cycle
      if (window.location.pathname !== '/login') {
        setTimeout(() => {
          message.error('Session timeout. Please login again.');
          window.location.href = '/login';
        }, 0);
      }
    }
    return Promise.reject(error);
  },
);

export default httpClient;
