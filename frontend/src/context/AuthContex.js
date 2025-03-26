import { createContext, useState, useEffect } from "react";
import api from "../api/axiosInstance";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Fetch user details when token exists
  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await api.get("/api/user/get-profile");
          setUser(response.data);
        } catch (error) {
          console.error("Failed to fetch user:", error);
          logout();
        }
      }
    };
    fetchUser();
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await api.post("/api/user/login", { email, password });
      localStorage.setItem("token", response.data.token);
      setToken(response.data.token);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
