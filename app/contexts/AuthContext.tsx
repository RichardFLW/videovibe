"use client";
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";

interface AuthContextType {
  isLogged: boolean;
  currentUser: User | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogged(true);
        setCurrentUser(user);
      } else {
        setIsLogged(false);
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  const login = () => {
    const user = auth.currentUser;
    if (user) {
      setIsLogged(true);
      setCurrentUser(user);
      Cookies.set("auth_token", user.uid, { expires: 1 / 1440 });
    }
  };

  const logout = () => {
    auth.signOut();
    Cookies.remove("auth_token");
    setIsLogged(false);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLogged, currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
