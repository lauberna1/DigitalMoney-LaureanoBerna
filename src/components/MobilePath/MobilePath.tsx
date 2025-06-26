"use client";
import { Text } from "@/components/Text/Text";
import { FaArrowRightLong } from "react-icons/fa6";
import s from "./MobilePath.module.css";
import { useRouter } from "next/navigation";
export function MobilePath({
  path,
  onClick,
}: {
  path:
    | "Inicio"
    | "Actividad"
    | "Tu perfil"
    | "Cargar dinero"
    | "Pagar servicios"
    | "Tarjetas";
  onClick?: () => void;
}) {
  const router = useRouter();
  const redirect = () => {
    if (path === "Inicio") {
      router.push("/dashboard");
    }
    if (path === "Tarjetas") {
      router.push("/dashboard/tarjetas");
    }
    if (path === "Pagar servicios") {
      router.push("/dashboard/pagar");
    }
    if (path === "Cargar dinero") {
      router.push("/dashboard/cargar");
    }
    if (path === "Actividad") {
      router.push("/dashboard/actividad");
    }
    if (path === "Tu perfil") {
      router.push("/dashboard/perfil");
    }
    if (onClick) {
      onClick();
    }
  };
  return (
    <div className={s.mobilePath} onClick={redirect}>
      <FaArrowRightLong className={s.arrow} />
      <Text variant="md" className={s.path}>
        {path}{" "}
      </Text>
    </div>
  );
}
