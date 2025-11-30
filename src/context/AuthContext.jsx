import React, { createContext, useContext, useState, useEffect } from "react";
import AuthService from "../service/auth.service";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setAuth] = useState(false);
  const [isLoading, setLoading] = useState(true);


  useEffect(() => {
    const init = async () => {
      try {
        if (AuthService.isLoggedIn()) {
          const res = await AuthService.getCurrentUser();
          if (res.success && res.user) {
            setUser(res.user);
            setAuth(true);
          } else {
            AuthService.logout();
            setAuth(false);
          }
        } else {
          setAuth(false);
        }
      } catch (e) {
        console.error("Auth init error:", e);
        AuthService.logout();
      }
      setLoading(false);
    };

    init();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await AuthService.login({ email, password });
      if (res.success && res.user) {
        setUser(res.user);
        setAuth(true);
        return true;
      }
      return false;
    } catch (e) {
      console.error("Login error:", e);
      return false;
    }
  };


  const register = async (name, email, password) => {
    try {
      const res = await AuthService.register({ name, email, password });
      if (res.success && res.user) {
        setUser(res.user);
        setAuth(true);
        return true;
      }
      return false;
    } catch (e) {
      console.error("Register error:", e);
      return false;
    }
  };


  const logout = () => {
    AuthService.logout();
    setUser(null);
    setAuth(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
