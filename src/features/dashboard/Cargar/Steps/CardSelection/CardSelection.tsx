import { Button } from "@/components/Button/Button";
import { Text } from "@/components/Text/Text";
import { useDashboard } from "@/context/DashboardContext/DashboardContext";
import { useRouter } from "next/navigation";
import React from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import Tarjetas from "../Tarjetas/Tarjetas";
import s from "./CardSelection.module.css";
export function CardSelection({
  selectedCard,
  setSelectedCard,
  nextStep,
}: {
  selectedCard: string | null;
  setSelectedCard: (cardId: string | null) => void;
  nextStep: () => void;
}) {
  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCard(e.target.value);
  };
  const { cards } = useDashboard();
  const router = useRouter();
  return (
    <div className={s.container}>
      <Text variant="h5" className={s.title}>
        Selecciona tu tarjeta
      </Text>
      <Tarjetas
        cards={cards}
        selectedCard={selectedCard}
        handleCardChange={handleCardChange}
      />
      <div
        className={s.add}
        onClick={() => router.push("/dashboard/tarjetas/agregar")}
      >
        <IoIosAddCircleOutline className={s.icon} />
        <Text variant="h6" className={s.text}>
          Nueva tarjeta
        </Text>
      </div>
      <div className={s.button}>
        <Button
          disabled={!selectedCard}
          text="Contiunar"
          variant="primary"
          onClick={nextStep}
        />
      </div>
    </div>
  );
}
