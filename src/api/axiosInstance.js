import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://lms-va5im0pg.b4a.run",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = JSON.parse(sessionStorage.getItem("accessToken")) || "";

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (err) => {
    console.error("Request error:", err);
    return Promise.reject(err);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log response error for better understanding
    if (error.response) {
      console.error("Response error:", error.response);
    } else if (error.request) {
      console.error("Request error, no response received:", error.request);
    } else {
      console.error("Error during setup:", error.message);
    }

    return Promise.reject(error);
  }
);
