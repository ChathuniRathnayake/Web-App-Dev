{/*
import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});
// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle common errors globally
        if (error.response) {
            if (error.response.status === 401) {
                // Redirect to login page
                window.location.href = "/";
            }
            else if (error.response.status === 500) {
                console.error("Server error. Please try again later.");
            }
        }
        else if (error.code === "ECONNABORTED") {
            console.error("Request timeout. Please try again.");
        }
        return Promise.reject(error);
    }
    
);

export default axiosInstance;

*/}


import axios from "axios";
import { BASE_URL, API_PATHS } from "./apiPaths"; // Import API_PATHS

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");

    // Define public routes that do not require an access token
    const publicRoutes = [
      API_PATHS.AUTH.REGISTER,
      API_PATHS.IMAGE.UPLOAD_IMAGE,
    ];

    // Check if the current request URL matches a public route
    const isPublicRoute = publicRoutes.some((route) =>
      config.url.includes(route)
    );

    // Only add the access token if it exists AND the route is not public
    if (accessToken && !isPublicRoute) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // Set 'Content-Type' header for file uploads
    if (
      config.url.endsWith(API_PATHS.IMAGE.UPLOAD_IMAGE) &&
      config.data instanceof FormData
    ) {
      config.headers["Content-Type"] = "multipart/form-data";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Define public routes that do not trigger a redirect on 401
    const publicRoutes = [
      API_PATHS.AUTH.REGISTER,
      API_PATHS.IMAGE.UPLOAD_IMAGE,
    ];

    // Get the original request config
    const originalRequest = error.config;
    const isPublicRoute = publicRoutes.some((route) =>
      originalRequest.url.endsWith(route)
    );

    // Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      // Do NOT redirect if it's a public route
      if (!isPublicRoute) {
        // Redirect to login page for private routes
        window.location.href = "/";
      }
    }
    // Handle other common errors
    else if (error.response && error.response.status === 500) {
      console.error("Server error. Please try again later.");
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timeout. Please try again.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

