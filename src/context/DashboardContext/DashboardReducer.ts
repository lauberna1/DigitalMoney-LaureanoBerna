import { DashboardAction, DashboardState } from "@/types/useDashboardTypes";

export const dashboardInitialState: DashboardState = {
  account: null,
  transactions: null,
  cards: null,
  services: null,
};

export function dashboardReducer(
  state: DashboardState,
  action: DashboardAction
): DashboardState {
  switch (action.type) {
    case "SET_ACCOUNT":
      return { ...state, account: action.payload };
    case "SET_TRANSACTIONS":
      return { ...state, transactions: action.payload };
    case "SET_CARDS":
      return { ...state, cards: action.payload };
    case "SET_SERVICES":
      return { ...state, services: action.payload };
    default:
      return state;
  }
}
