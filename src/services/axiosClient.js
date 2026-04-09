import axios from 'axios';
import serverURL from '../serverConfig';

const axiosClient = axios.create({
  baseURL: serverURL.url,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem('auth-token') ||
      sessionStorage.getItem('auth-token-backup');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem('auth-token');
      localStorage.removeItem('user-info');
      sessionStorage.removeItem('auth-token-backup');
      if (!window.location.pathname.startsWith('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
