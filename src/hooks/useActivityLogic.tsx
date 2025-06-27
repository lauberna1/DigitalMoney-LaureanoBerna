// hooks/useActividadLogic.ts
"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDashboard } from "@/context/DashboardContext/DashboardContext";
import { Transaction } from "@/types/globalTypes";
import { handleFilterByDate } from "@/utils/filterByDate";

export const activityTypes = {
  Deposit: "Depositaste dinero",
  Transaction: "Transaccion",
  Transfer: "Transferencia",
};

export function useActividadLogic(isHome: boolean) {
  const { transactions } = useDashboard();
  const searchParams = useSearchParams();
  const router = useRouter();

  const searchQuery = searchParams.get("search") || "";
  const [search, setSearch] = useState(searchQuery);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPeriod, setCurrentPeriod] = useState<string | null>(null);
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[] | null
  >(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const isLoading = !transactions;

  // Escape para cerrar filtros
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // FILTRADO
  const filterTransactions = useCallback((): Transaction[] => {
    let result = [
      ...(isHome
        ? transactions?.slice(0, itemsPerPage) ?? []
        : transactions ?? []),
    ];

    if (currentPeriod) {
      const temp: Transaction[] = [];
      handleFilterByDate(currentPeriod, result, (filtered) => {
        if (Array.isArray(filtered)) temp.push(...filtered);
      });
      result = temp;
    }

    if (search) {
      const lowerSearch = search.toLowerCase().trim();
      result = result.filter((t) => {
        let searchString = "";

        if (t.type === "Deposit") {
          // Para Deposit busca "Depositaste dinero"
          searchString = "Depositaste dinero";
        } else if (t.type === "Transaction") {
          // Para Transaction busca "Pagaste a [nombre]"
          // Supongo que el nombre está en t.description, cambia si no es así
          searchString = `Pagaste a ${t.description || ""}`;
        } else {
          // Para otros tipos solo el texto fijo
          searchString =
            activityTypes[t.type as keyof typeof activityTypes] || "";
        }

        return searchString.toLowerCase().includes(lowerSearch);
      });
    }

    return result;
  }, [isHome, transactions, currentPeriod, search]);

  // Aplicar filtros
  useEffect(() => {
    const filtered = filterTransactions();
    setFilteredTransactions(
      filtered.length === transactions?.length ? null : filtered
    );
    setCurrentPage(1);
  }, [filterTransactions, transactions]);

  const totalItems = useMemo(
    () => filteredTransactions ?? transactions ?? [],
    [filteredTransactions, transactions]
  );

  const totalPages = useMemo(
    () => Math.ceil(totalItems.length / itemsPerPage),
    [totalItems]
  );

  const paginatedTransactions = useMemo(
    () =>
      totalItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ),
    [totalItems, currentPage]
  );

  const handleSearchEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      router.push(`/dashboard/actividad?search=${encodeURIComponent(search)}`);
    }
  };

  return {
    search,
    setSearch,
    isOpen,
    setIsOpen,
    currentPeriod,
    setCurrentPeriod,
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedTransactions,
    isLoading,
    handleSearchEnter,
  };
}
