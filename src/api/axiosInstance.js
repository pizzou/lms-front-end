import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://lms-server-nrfz.onrender.com',
});

// Interceptor to attach token for authenticated requests
axiosInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
