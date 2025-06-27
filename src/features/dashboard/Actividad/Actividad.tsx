"use client";
import { useActividadLogic } from "@/hooks/useActivityLogic";
import { Search } from "../Inicio/components/Search/Search";
import s from "./Actividad.module.css";
import { FilterButton } from "./components/FilterButton/FilterButton";
import Filters from "./components/Filters/Filters";
import { Transactions } from "./components/Transactions/Transactions";

export const activityTypes = {
  Deposit: "Depositaste dinero",
  Transaction: "Pagaste a",
  Transfer: "Transferencia",
};

export function Actividad({ isHome }: { isHome: boolean }) {
  const {
    search,
    setSearch,
    isOpen,
    setIsOpen,
    setCurrentPeriod,
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedTransactions,
    isLoading,
    handleSearchEnter,
  } = useActividadLogic(isHome);

  return (
    <section className={s.actividad} onClick={() => setIsOpen(false)}>
      <div className={s.search}>
        <Search
          value={search}
          onChange={setSearch}
          onKeyDown={handleSearchEnter}
        />
        {!isHome && <FilterButton onClick={() => setIsOpen(!isOpen)} />}
      </div>

      <Transactions
        isHome={isHome}
        transactions={
          isHome
            ? paginatedTransactions?.slice(0, 10) ?? null
            : paginatedTransactions
        }
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        openFilters={() => setIsOpen(!isOpen)}
        loading={isLoading}
      />

      {!isHome && (
        <Filters
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          handleFilter={setCurrentPeriod}
          setSearch={setSearch}
        />
      )}
    </section>
  );
}
