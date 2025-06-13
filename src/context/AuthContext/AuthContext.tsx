"use client";
import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

import { AuthState, User } from "./types";
import { authInitialState, authReducer } from "./AuthReducer";
import { useRouter } from "next/navigation";

interface AuthContextType extends AuthState {
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, authInitialState);
  const Router = useRouter();
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decoded = jwtDecode<User>(token);
        dispatch({ type: "LOGIN", payload: { user: decoded, token } });
      } catch (err) {
        console.error("Token inválido", err);
        Cookies.remove("token");
      }
    }
  }, []);

  const login = (token: string) => {
    try {
      const decoded = jwtDecode<User>(token);
      Cookies.set("token", token, { expires: 7 });
      dispatch({ type: "LOGIN", payload: { user: decoded, token } });
      Router.push("/dashboard");
    } catch (err) {
      console.error("No se pudo decodificar el token", err);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    Router.push("/");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
}
