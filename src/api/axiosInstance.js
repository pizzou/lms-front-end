import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://lms-va5im0pg.b4a.run", 
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem("accessToken") || ""; // Removed JSON.parse

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (err) => Promise.reject(err)
);

// Add a response interceptor to handle network/CORS issues
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 502) {
      console.error("Backend is unavailable or misconfigured (502 Bad Gateway).");
    } else if (error.message === 'Network Error') {
      console.error("Network error. This might be due to CORS or the server being down.");
    } else if (error.response && error.response.status === 401) {
      console.error("Unauthorized. Token might be invalid or expired.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
