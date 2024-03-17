import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { UserEntity } from "../infrastructure/entities/user";
import axios from "axios";
import { UserRole } from "../constants/roles";

type AuthContextType = {
  user: UserEntity | null;
  login: (user: UserEntity, token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {}
});

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<UserEntity | null>(null);
  const saveSession = async (user: UserEntity, token: string) => {
    setUser(user);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    axios.defaults.headers.common["Authorization"] = `${token}`;
  }

  const deleteSession = async () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    axios.defaults.headers.common["Authorization"] = "";
  }

  const login = async (user: UserEntity, token: string) => {
    await saveSession(user, token);
  };
  const logout = async () => {
    await deleteSession();
  };

  const checkSession = async () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    console.log(token, user);
    if (token && user) {
      const sesionUser = JSON.parse(user);
      await saveSession({email: sesionUser.email as string, role: sesionUser.role as UserRole}, token);
    }
  };


  useEffect(() => {
    checkSession();
  }, []);

  const value = { user, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  if (AuthContext === undefined) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return useContext(AuthContext);
};
