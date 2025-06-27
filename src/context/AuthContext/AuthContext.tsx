"use client";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";

import { useAuthHook } from "@/hooks/useAuthHook";
import { useRouter } from "next/navigation";
import { authInitialState, authReducer } from "./AuthReducer";
import { AuthState, DecodedToken } from "@/types/useAuthTypes";
import { User } from "@/types/globalTypes";

interface AuthContextType extends AuthState {
  login: (token: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  /* HOOKS */
  const [state, dispatch] = useReducer(authReducer, authInitialState);
  const { getUser } = useAuthHook();
  const Router = useRouter();

  /* EFFECTS */
  useEffect(() => {
    const initAuth = async () => {
      if (state?.user) return;

      const token = Cookies.get("token");
      if (!token) return;
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        const now = Math.floor(Date.now() / 1000);
        if (decoded.exp < now) {
          Cookies.remove("token");
          return;
        }
        const { user } = await getUser({ token, userId: decoded.username });

        dispatch({ type: "LOGIN", payload: { user, token } });
      } catch (err) {
        console.error("Token inválido al inicializar auth", err);
        Cookies.remove("token");
      }
    };

    initAuth();
  }, [getUser, state?.user]);

  /* HANDLERS */

  const setUser = (user: User) => {
    dispatch({ type: "SET_USER", payload: user });
  };

  const login = async (token: string) => {
    try {
      const decoded = jwtDecode<DecodedToken>(token);

      Cookies.set("token", token, { expires: 7 });

      const { user } = await getUser({ token, userId: decoded.username });
      dispatch({ type: "LOGIN", payload: { user, token } });
      console.log("router");
      Router.push("/dashboard");
    } catch (err) {
      console.error("Error al iniciar sesion", err);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    Router.push("/");
    dispatch({ type: "LOGOUT" });
  };
  return (
    <AuthContext.Provider value={{ ...state, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
}
