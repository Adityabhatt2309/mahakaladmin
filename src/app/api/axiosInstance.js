// src/api/axiosInstance.js
import axios from "axios";
import { getCookie } from "cookies-next";

const axiosInstance = axios.create({
  baseURL: "https://mahakal-api.vercel.app/api", // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the Bearer token in the Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request error here
    return Promise.reject(error);
  }
);

export default axiosInstance;
