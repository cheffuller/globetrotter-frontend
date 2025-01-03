import React, { createContext, useContext, useState, useEffect, ReactNode, useReducer } from 'react';
import { isAuthenticated, setJwtToken, removeJwtToken, getJwtToken, getUsername } from './AuthService';

interface AuthContextProps {
  isLoggedIn: boolean;
  username: string;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
//   const loggedInRef = useRef<boolean>(false);

  useEffect(() => {
    const loggedIn = isAuthenticated();
    setIsLoggedIn(loggedIn);
    const user:string = getUsername()!;
    setUsername(user);
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
    <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
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
