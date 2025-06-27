import { Account, Card, Service, Transaction } from "./globalTypes";

export interface DashboardState {
  account: Account | null;
  transactions: Transaction[] | null;
  cards: Card[] | null;
  services: Service[] | null;
}

export type DashboardAction =
  | { type: "SET_ACCOUNT"; payload: Account }
  | { type: "SET_TRANSACTIONS"; payload: Transaction[] }
  | { type: "SET_CARDS"; payload: Card[] }
  | { type: "SET_SERVICES"; payload: Service[] };
