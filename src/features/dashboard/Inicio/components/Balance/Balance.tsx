"use client";
import { useDashboard } from "@/context/DashboardContext/DashboardContext";
import s from "./Balance.module.css";
import Link from "next/link";
import { Text } from "@/components/Text/Text";
export function Balance() {
  const { account } = useDashboard();
  return (
    <div className={s.balance}>
      <div className={s.options}>
        <Link href={"/dashboard/tarjetas"} className={s.option}>
          Ver tarjetas
        </Link>
        <Link href={"/dashboard/perfil"} className={s.option}>
          Ver CVU
        </Link>
      </div>
      <div className={s.amount}>
        <Text variant="md" className={s.amountText}>
          Dinero disponible
        </Text>
        <Text variant="xl" className={s.amountNumber}>
          ${" "}
          {account?.available_amount === undefined
            ? "0,00"
            : account.available_amount.toLocaleString("es-AR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
        </Text>
      </div>
    </div>
  );
}
