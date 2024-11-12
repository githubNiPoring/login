import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Check local storage for authentication state on initial load
    const storedUsername = localStorage.getItem("username");
    const storedAuth = localStorage.getItem("isAuthenticated") === "true";

    if (storedAuth && storedUsername) {
      setIsAuthenticated(true);
      setUsername(storedUsername);
    }
  }, []);

  const login = (user) => {
    setIsAuthenticated(true);
    setUsername(user);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("username", user);
    console.log("User logged in:", user);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername("");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
    console.log("User logged out");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, username }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
