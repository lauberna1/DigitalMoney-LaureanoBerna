import {
  Account,
  Card,
  CardData,
  Transaction,
  User,
} from "@/types/globalTypes";
import { useCallback } from "react";

export function useDashboardHook() {
  const getAccount = useCallback(async ({ token }: { token: string }) => {
    try {
      const res = await fetch(
        `https://digitalmoney.digitalhouse.com/api/account`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Error al obtener los datos de la cuenta");
      const account: Account = await res.json();
      return { account };
    } catch {
      throw new Error("Error al obtener los datos de la cuenta");
    }
  }, []);

  const getTransactions = useCallback(
    async ({ token, accountId }: { token: string; accountId: string }) => {
      try {
        const res = await fetch(
          `https://digitalmoney.digitalhouse.com/api/accounts/${accountId}/activity`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Error al obtener las transacciones");
        const transactions: Transaction[] = await res.json();
        const sorted = transactions.sort(
          (a, b) => new Date(b.dated).getTime() - new Date(a.dated).getTime()
        );
        return { transactions: sorted };
      } catch {
        throw new Error("Error al obtener las transacciones");
      }
    },
    []
  );

  const updateUser = useCallback(
    async (
      data: {
        dni: number;
        phone: string;
        firstname: string;
        lastname: string;
      },
      id: string,
      token: string
    ) => {
      try {
        const res = await fetch(
          `https://digitalmoney.digitalhouse.com/api/users/${id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
            body: JSON.stringify(data),
          }
        );

        if (!res.ok) throw new Error("Error al actualizar usuario");
        const user: User = await res.json();
        return { user };
      } catch {
        throw new Error("Error al actualizar usuario");
      }
    },
    []
  );

  const getCards = useCallback(
    async ({ token, accountId }: { token: string; accountId: number }) => {
      try {
        const res = await fetch(
          `https://digitalmoney.digitalhouse.com/api/accounts/${accountId}/cards`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Error al obtener las tarjetas");
        const cards: Card[] = await res.json();
        return { cards };
      } catch {
        throw new Error("Error al obtener las tarjetas");
      }
    },
    []
  );

  const deleteCard = useCallback(
    async ({
      token,
      cardId,
      accountId,
    }: {
      token: string;
      cardId: number;
      accountId: number;
    }) => {
      try {
        const res = await fetch(
          `https://digitalmoney.digitalhouse.com/api/accounts/${accountId}/cards/${cardId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Error al eliminar la tarjeta");
        const card: Card = await res.json();
        return { card };
      } catch {
        throw new Error("Error al eliminar la tarjeta");
      }
    },
    []
  );

  const addCard = useCallback(
    async ({
      token,
      accountId,
      number,
      fullName,
      expiration,
      cvv,
    }: CardData & {
      token: string;
      accountId: number;
    }) => {
      try {
        const res = await fetch(
          `https://digitalmoney.digitalhouse.com/api/accounts/${accountId}/cards`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
            body: JSON.stringify({
              cod: parseInt(cvv),
              first_last_name: fullName,
              expiration_date: expiration,
              number_id: parseInt(number),
            }),
          }
        );

        if (!res.ok) throw new Error("Error al agregar la tarjeta");
        const card: Card = await res.json();
        return { card };
      } catch {
        throw new Error("Error al agregar la tarjeta");
      }
    },
    []
  );

  const updateAlias = useCallback(
    async ({
      token,
      accountId,
      alias,
    }: {
      token: string;
      accountId: number;
      alias: string;
    }) => {
      try {
        const res = await fetch(
          `https://digitalmoney.digitalhouse.com/api/accounts/${accountId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
            body: JSON.stringify({
              alias,
            }),
          }
        );

        if (!res.ok) throw new Error("Error al editar el alias");
      } catch {
        throw new Error("Error al editar el alias");
      }
    },
    []
  );

  const depositMoney = useCallback(
    async ({
      token,
      accountId,
      amount,
      dated,
    }: {
      token: string;
      accountId: number;
      amount: number;
      dated: string;
    }) => {
      try {
        const res = await fetch(
          `https://digitalmoney.digitalhouse.com/api/accounts/${accountId}/deposits`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
            body: JSON.stringify({
              amount,
              dated,
              destination: "Cuenta propia",
              origin: "Card",
            }),
          }
        );

        if (!res.ok) throw new Error("Error al depositar dinero");
        const deposit: Transaction = await res.json();
        return { deposit };
      } catch {
        throw new Error("Error al depositar dinero");
      }
    },
    []
  );

  return {
    getAccount,
    getTransactions,
    updateUser,
    getCards,
    deleteCard,
    addCard,
    updateAlias,
    depositMoney,
  };
}
