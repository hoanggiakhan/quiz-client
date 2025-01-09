import React, { createContext, useContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";

interface AuthContextProps {
  isAuthenticated: boolean;
  role: string | null;
  setIsAuthenticated: (value: boolean) => void;
  setRole: (role: string | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          setIsAuthenticated(true);
          setRole(decoded.role); // Lưu vai trò từ token
        } else {
          localStorage.removeItem("jwtToken");
        }
      } catch {
        localStorage.removeItem("jwtToken");
      }
    }
  }, []);

  const logout = () => {
    setIsAuthenticated(false);
    setRole(null);
    localStorage.removeItem("jwtToken");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, setIsAuthenticated, setRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
