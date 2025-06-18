import { Account, Card, Transaction } from "./globalTypes";

export interface DashboardState {
  account: Account | null;
  transactions: Transaction[] | null;
  cards: Card[] | null;
}

export type DashboardAction =
  | { type: "SET_ACCOUNT"; payload: Account }
  | { type: "SET_TRANSACTIONS"; payload: Transaction[] }
  | { type: "SET_CARDS"; payload: Card[] }
