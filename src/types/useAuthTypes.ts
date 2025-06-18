import { User } from "./globalTypes";

export interface DecodedToken {
  username: number;
  email: string;
  exp: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
}

export type AuthAction =
  | { type: "LOGIN"; payload: { user: User; token: string } }
  | { type: "LOGOUT" }
  | { type: "SET_USER"; payload: User };
