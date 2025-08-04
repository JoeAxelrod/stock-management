import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000',
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('stock_auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear auth state
      localStorage.removeItem('stock_auth_token');
      localStorage.removeItem('stock_auth_user');
      console.log('Authentication expired, redirecting to login');
      // Optionally trigger a logout or redirect
    }
    return Promise.reject(error);
  }
); 