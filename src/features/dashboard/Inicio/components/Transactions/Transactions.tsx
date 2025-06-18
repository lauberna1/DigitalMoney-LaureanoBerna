import { Text } from "@/components/Text/Text";
import s from "./Transactions.module.css";
import { useDashboard } from "@/context/DashboardContext/DashboardContext";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { BounceLoader } from "react-spinners";
export function Transactions() {
  const { transactions } = useDashboard();
  const router = useRouter();
  return (
    <div className={s.container}>
      <Text variant="h6">Tu actividad</Text>
      <span className={s.separator} />
      <div className={s.content}>
        {transactions === null && (
          <div className={s.loader}>
            <BounceLoader size="50px" />
          </div>
        )}
        {transactions?.length === 0 && (
          <div className={s.noTransactions}>No tienes transacciones</div>
        )}
        {transactions
          ?.sort(
            (a, b) => new Date(b.dated).getTime() - new Date(a.dated).getTime()
          )
          ?.slice(0, 10)
          ?.map(({ id, amount, dated, description }) => (
            <React.Fragment key={id}>
              <div className={s.item}>
                <span className={s.dot} />
                <Text variant="sm" className={s.title}>
                  {description}
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
        <div
          className={s.moreContainer}
          onClick={() => router.push("/dashboard/actividad")}
        >
          <Text variant="sm" className={s.more}>
            Ver toda tu actividad
          </Text>
          <FaArrowRightLong className={s.arrow} />
        </div>
      </div>
    </div>
  );
}
