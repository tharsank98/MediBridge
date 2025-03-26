import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4001", // Remove extra `/api`
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Enable cookies (if needed)
});

// 🔹 Request Interceptor: Attach Token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Retrieve token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔹 Response Interceptor: Handle Errors Globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // Unauthorized: Clear token & redirect
        localStorage.removeItem("token");
        window.location.href = "/login"; // Redirect to login page
      }
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  }
);

const AxiosProvider = () => {
  return null; // Empty component
};

export default AxiosProvider;
