"use client";
import { Text } from "@/components/Text/Text";
import s from "./AddCard.module.css";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useDashboard } from "@/context/DashboardContext/DashboardContext";
import { toast } from "react-toastify";
export function AddCard() {
  const { cards } = useDashboard();
  const router = useRouter();
  const handleClick = () => {
    if (cards?.length === 10) {
      toast.error("No puedes agregar más de 10 tarjetas");
      return;
    }
    router.push("/dashboard/tarjetas/agregar");
  };

  return (
    <div className={s.addCard}>
      <Text variant="h6" className={s.title}>
        Agregá tu tarjeta de débito o crédito
      </Text>
      <div className={s.add} role="button" onClick={handleClick}>
        <div className={s.left}>
          <IoIosAddCircleOutline className={s.icon} />
          <Text variant="h5" className={s.text}>
            Nueva tarjeta
          </Text>
        </div>

        <FaArrowRightLong className={s.icon} />
      </div>
    </div>
  );
}
