"use client";
import { Text } from "@/components/Text/Text";
import { useDashboard } from "@/context/DashboardContext/DashboardContext";
import { MdContentCopy } from "react-icons/md";
import { toast } from "react-toastify";
import s from "./AccountInfo.module.css";

export function AccountInfo() {
  const { account } = useDashboard();

  const handleCopy = async (text: string) => {
    if (account) {
      try {
        await navigator.clipboard.writeText(text);
        toast(`Copiado`);
      } catch (err) {
        console.error("Error al copiar al portapapeles:", err);
      }
    }
  };

  return (
    <div className={s.accountInfo}>
      <Text variant="h6" className={s.title}>
        Copia tu CVU o alias para ingresar o transferir dinero desde otra cuenta
      </Text>

      <div className={s.content}>
        <div className={s.item}>
          <Text variant="h5" className={s.subtitle}>
            CVU
          </Text>
          <Text variant="md" className={s.value}>
            {account?.cvu ? account?.cvu : "-"}
          </Text>
        </div>
        <MdContentCopy
          className={`${s.copy} ${account?.cvu ? s.disabled : ""}`}
          onClick={() => handleCopy(account?.cvu || "")}
        />
      </div>

      <span className={s.separator} />

      <div className={s.content}>
        <div className={s.item}>
          <Text variant="h5" className={s.subtitle}>
            Alias
          </Text>
          <Text variant="md" className={s.value}>
            {account?.alias ? account?.alias : "-"}
          </Text>
        </div>
        <MdContentCopy
          className={`${s.copy} ${account?.alias ? s.disabled : ""}`}
          onClick={() => handleCopy(account?.alias || "")}
        />
      </div>
    </div>
  );
}
