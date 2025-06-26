"use client";
import { Button } from "@/components/Button/Button";
import { MobilePath } from "@/components/MobilePath/MobilePath";
import { Text } from "@/components/Text/Text";
import { useDashboard } from "@/context/DashboardContext/DashboardContext";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";
import { useParams } from "next/navigation";
import { CiCircleCheck } from "react-icons/ci";
import s from "./TransactionDetail.module.css";

export function TransactionDetail() {
  const params = useParams();
  const { id } = params;
  const { transactions } = useDashboard();

  const transaction = transactions?.find(
    (t) => t.id.toString() === id?.toString()
  );

  return (
    <div className={s.transactionDetail}>
      <MobilePath path="Actividad" />
      <div className={s.card}>
        <div className={s.titleContainer}>
          <Text variant="h5" className={s.title}>
            <CiCircleCheck className={s.icon} />
            Aprobada
          </Text>
          <Text variant="xs" className={s.date2}>
            creada el {formatDate(transaction?.dated.toString())}
          </Text>
        </div>
        <Text variant="xs" className={s.date}>
          creada el {formatDate(transaction?.dated.toString())}
        </Text>
        <div className={s.transferenciaInfo}>
          <Text variant="h6" className={s.transferencia}>
            {transaction?.type === "Deposit"
              ? "Deposito de dinero"
              : "Transferencia de dinero"}
          </Text>
          <Text variant="xl" className={s.amount}>
            {formatCurrency(transaction?.amount)}
          </Text>
        </div>
        {transaction?.type !== "Deposit" && (
          <div className={s.transferenciaInfo}>
            <Text variant="h6" className={s.infoTitle}>
              Le transferiste a
            </Text>
            <Text variant="xl" className={`${s.infoValue} ${s.destination}`}>
              {transaction?.destination}
            </Text>
          </div>
        )}

        <div className={s.transferenciaInfo}>
          <Text variant="h6" className={s.infoTitle}>
            Número de operación
          </Text>
          <Text variant="xl" className={s.infoValue}>
            {transaction?.id}
          </Text>
        </div>
      </div>
      <div className={s.buttons}>
        <Button
          variant="tertiary"
          text="Ir al inicio"
          href="/dashboard/actividad"
          style={{
            backgroundColor: "rgba(206, 206, 206, 1)",
          }}
        />
      </div>
    </div>
  );
}
