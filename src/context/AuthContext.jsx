// src/context/AuthContext.js

import React, { createContext, useState, useContext, useEffect } from "react";
import api from "../services/api"; // We'll create this service next

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      // If a token exists, we could validate it with the backend here
      // For now, we'll assume it's valid and decode it to get user info
      // In a real app, you'd fetch the user profile: api.get('/api/auth/me')
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      // For simplicity, we won't decode the user here, just mark as authenticated
      setUser({ isAuthenticated: true });
    }
    setLoading(false);
  }, [token]);

  const login = async (email, password) => {
    const response = await api.post("/api/auth/login", { email, password });
    const { token } = response.data;
    localStorage.setItem("token", token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setToken(token);
    setUser({ isAuthenticated: true });
  };

  const register = async (username, email, password) => {
    await api.post("/api/auth/register", { username, email, password });
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    isAuthenticated: !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
