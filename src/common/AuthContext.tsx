import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { isAuthenticated, setJwtToken, removeJwtToken, getJwtToken } from './AuthService';

interface AuthContextProps {
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    console.log("AuthProvider mounted.");
    const loggedIn = isAuthenticated();
    console.log("isAuthenticated called. Result:", loggedIn);
    setIsLoggedIn(loggedIn);
  }, []);

  const login = (token: string) => {
    setJwtToken(token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    removeJwtToken();
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
