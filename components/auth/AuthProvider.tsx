"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type User = {
  username: string;
};

type AuthContextType = {
  user: User | null;

  login: (username: string, password: string) => boolean;

  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("family_user");

      return saved ? JSON.parse(saved) : null;
    }

    return null;
  });

  function login(username: string, password: string) {
    if (username === "admin" && password === "admin") {
      const newUser = {
        username,
      };

      localStorage.setItem("family_user", JSON.stringify(newUser));

      setUser(newUser);

      return true;
    }

    return false;
  }

  function logout() {
    localStorage.removeItem("family_user");

    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be inside AuthProvider");
  }

  return context;
}
