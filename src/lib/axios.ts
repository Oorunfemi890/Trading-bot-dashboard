// ===================================================
// FILE: src/lib/axios.ts
// ===================================================
import axios from 'axios';
import { API_CONFIG } from '@/config/api.config';
import { STORAGE_KEYS } from '@/config/constants';
import { storage } from '@/utils/storage.util';

const axiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = storage.get<string>(STORAGE_KEYS.ACCESS_TOKEN);
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // If 401 and not already retried, try to refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = storage.get<string>(STORAGE_KEYS.REFRESH_TOKEN);
        
        if (refreshToken) {
          // Attempt token refresh
          const response = await axios.post(
            `${API_CONFIG.BASE_URL}/api/v1/auth/refresh`,
            { refreshToken }
          );
          
          const { accessToken } = response.data.data;
          storage.set(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
          
          // Retry original request
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, logout user
        storage.remove(STORAGE_KEYS.ACCESS_TOKEN);
        storage.remove(STORAGE_KEYS.REFRESH_TOKEN);
        storage.remove(STORAGE_KEYS.USER);
        
        // Redirect to login
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;