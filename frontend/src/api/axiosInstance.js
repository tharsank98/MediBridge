// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:4001/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   withCredentials: true,
// });

// API.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// API.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response) {
//       if (error.response.status === 401) {
//         localStorage.removeItem("token");
//         window.location.href = "/login";
//       }
//       return Promise.reject(error.response.data);
//     }
//     return Promise.reject(error);
//   }
// );

// const AxiosProvider = () => {
//   return null;
// };

// export default AxiosProvider;

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4001/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
