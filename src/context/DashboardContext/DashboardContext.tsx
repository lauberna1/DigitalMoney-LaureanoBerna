"use client";
import { useDashboardHook } from "@/hooks/useDashboardHook";
import { Account, Card, CardData, Transaction } from "@/types/globalTypes";
import { DashboardAction, DashboardState } from "@/types/useDashboardTypes";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { useAuth } from "../AuthContext/AuthContext";
import { dashboardInitialState, dashboardReducer } from "./DashboardReducer";

interface DashboardContextType extends DashboardState {
  setAccount: (account: Account) => void;
  setTransactions: (transactions: Transaction[]) => void;
  setCards: (cards: Card[]) => void;

  getAccountData: () => void;
  getTransactionsData: () => void;
  getCardsData: () => void;
  deleteCardData: ({ cardId }: { cardId: number }) => void;
  addCardData: ({ number, fullName, expiration, cvv }: CardData) => void;

  dispatch: React.Dispatch<DashboardAction>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(dashboardReducer, dashboardInitialState);
  const { token, user } = useAuth();
  const { getAccount, getTransactions, getCards, deleteCard, addCard } =
    useDashboardHook();

  /* REDUCER FUNCTIONS */
  const setAccount = useCallback(
    (account: Account) => {
      dispatch({ type: "SET_ACCOUNT", payload: account });
    },
    [dispatch]
  );

  const setTransactions = useCallback(
    (transactions: Transaction[]) => {
      dispatch({ type: "SET_TRANSACTIONS", payload: transactions });
    },
    [dispatch]
  );

  const setCards = useCallback(
    (cards: Card[]) => {
      dispatch({ type: "SET_CARDS", payload: cards });
    },
    [dispatch]
  );

  /* UTIL FUNCTIONS */
  const getAccountData = useCallback(async () => {
    if (!token) return;
    try {
      const { account } = await getAccount({ token });
      setAccount(account);
    } catch (err) {
      console.error("Error al obtener los datos de la cuenta", err);
    }
  }, [getAccount, setAccount, token]);

  const getTransactionsData = useCallback(async () => {
    if (!token || !state?.account?.id) return;
    try {
      const { transactions } = await getTransactions({
        token,
        accountId: state.account.id.toString(),
      });
      setTransactions(transactions);
    } catch (err) {
      console.error("Error al obtener las transacciones", err);
    }
  }, [getTransactions, setTransactions, token, state?.account?.id]);

  const getCardsData = useCallback(async () => {
    if (!token || !state?.account?.id) return;
    try {
      const { cards } = await getCards({ token, accountId: state.account.id });
      setCards(cards);
    } catch (err) {
      console.error("Error al obtener las tarjetas", err);
    }
  }, [getCards, setCards, token, state?.account?.id]);

  const deleteCardData = useCallback(
    async ({ cardId }: { cardId: number }) => {
      if (!token || !state?.account?.id || !cardId) return;
      try {
        await deleteCard({
          token,
          cardId: cardId,
          accountId: state.account.id,
        });
        if (state.cards) {
          setCards(state.cards.filter((card) => card.id !== cardId));
        }
      } catch (err) {
        console.error("Error al eliminar la tarjeta", err);
      }
    },
    [deleteCard, token, state?.account?.id, setCards, state?.cards]
  );

  const addCardData = useCallback(
    async ({ number, fullName, expiration, cvv }: CardData) => {
      if (!token || !state?.account?.id) return;
      try {
        const { card } = await addCard({
          token,
          accountId: state.account.id,
          number,
          fullName,
          expiration,
          cvv,
        });
        if (state.cards) {
          setCards([...state.cards, card]);
        }
      } catch (err) {
        console.error("Error al agregar la tarjeta", err);
      }
    },
    [addCard, token, state?.account?.id, setCards, state?.cards]
  );

  /* EFFECTS */
  useEffect(() => {
    const init = async () => {
      await Promise.all([
        getAccountData(),
        getTransactionsData(),
        getCardsData(),
      ]);
    };

    if (user) init();
  }, [getAccountData, getTransactionsData, getCardsData, user]);
  console.log(state);

  return (
    <DashboardContext.Provider
      value={{
        ...state,
        dispatch,
        setAccount,
        getAccountData,
        setTransactions,
        getTransactionsData,
        getCardsData,
        setCards,
        deleteCardData,
        addCardData,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard debe usarse dentro de DashboardProvider");
  }
  return context;
};
