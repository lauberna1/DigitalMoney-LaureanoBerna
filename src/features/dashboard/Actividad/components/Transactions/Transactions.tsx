import { Text } from "@/components/Text/Text";
import { Transaction } from "@/types/globalTypes";
import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { BounceLoader } from "react-spinners";
import s from "./Transactions.module.css";
import { VscSettings } from "react-icons/vsc";
import { activityTypes } from "../../Actividad";
export function Transactions({
  transactions,
  isHome,
  currentPage,
  totalPages,
  onPageChange,
  openFilters,
  loading,
}: {
  transactions: Transaction[] | null;
  isHome: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  openFilters: () => void;
  loading: boolean;
}) {
  const router = useRouter();
  return (
    <div className={s.container}>
      <div className={s.header}>
        <Text variant="h6">Tu actividad</Text>
        <button
          className={s.filterButton}
          onClick={(e) => {
            e.stopPropagation();
            openFilters();
          }}
        >
          Filtrar
          <VscSettings className={s.icon} />
        </button>
      </div>
      <span className={s.separator} />
      <div className={s.content}>
        {loading && (
          <div className={s.loader}>
            <BounceLoader size="50px" />
          </div>
        )}
        {!transactions && (
          <div className={s.noTransactions}>No tienes transacciones</div>
        )}
        {transactions
          ?.sort(
            (a, b) => new Date(b.dated).getTime() - new Date(a.dated).getTime()
          )
          ?.slice(0, 10)
          ?.map(({ id, amount, dated, type }) => (
            <React.Fragment key={id}>
              <div
                className={s.item}
                onClick={() => router.push(`/dashboard/actividad/${id}`)}
              >
                <span className={s.dot} />
                <Text variant="sm" className={s.title}>
                  {activityTypes[type as keyof typeof activityTypes]}
                </Text>
                <div className={s.amountContainer}>
                  <Text variant="sm" className={s.amount}>
                    $ {amount}
                  </Text>
                  <Text variant="xs" className={s.date}>
                    {new Intl.DateTimeFormat("es-ES", {
                      weekday: "long",
                    }).format(new Date(dated))}
                  </Text>
                </div>
              </div>
              <span className={s.separator} />
            </React.Fragment>
          ))}
        {isHome && (
          <div
            className={s.moreContainer}
            onClick={() => router.push("/dashboard/actividad")}
          >
            <Text variant="sm" className={s.more}>
              Ver toda tu actividad
            </Text>
            <FaArrowRightLong className={s.arrow} />
          </div>
        )}

        {!isHome && totalPages ? (
          <div className={s.pagination}>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`${s.pageButton} ${
                  currentPage === i + 1 ? s.active : ""
                }`}
                onClick={() => onPageChange?.(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
