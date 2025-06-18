import { Text } from "@/components/Text/Text";
import { FaArrowRightLong } from "react-icons/fa6";
import s from "./MobilePath.module.css";
export function MobilePath({
  path,
}: {
  path:
    | "Inicio"
    | "Actividad"
    | "Tu perfil"
    | "Cargar dinero"
    | "Pagar servicios"
    | "Tarjetas";
}) {
  return (
    <div className={s.mobilePath}>
      <FaArrowRightLong className={s.arrow} />
      <Text variant="md" className={s.path}>
        {path}{" "}
      </Text>
    </div>
  );
}
