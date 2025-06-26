import { Text } from "@/components/Text/Text";
import s from "./CardSelection.module.css";
import { useDashboard } from "@/context/DashboardContext/DashboardContext";
import { BounceLoader } from "react-spinners";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "@/components/Button/Button";
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
      <div className={s.content}>
        <Text variant="h6" className={s.subtitle}>
          Tus tarjetas
        </Text>
        {cards === null && (
          <div className={s.loader}>
            <BounceLoader size="50px" />
          </div>
        )}

        {cards && cards.length === 0 && <div>No tienes tarjetas</div>}
        {cards?.map((card, index) => (
          <React.Fragment key={card.id}>
            <div className={s.period}>
              <label
                className={`${s.label} ${
                  selectedCard === card.id.toString() && s.checked
                }`}
                htmlFor={card.id.toString()}
              >
                <span className={s.dot}></span>
                terminada en {card.number_id.toString().slice(-4)}
              </label>
              <input
                className={s.input}
                type="radio"
                id={card.id.toString()}
                name="card"
                value={card.id.toString()}
                checked={selectedCard === card.id.toString()}
                onChange={handleCardChange}
              />
            </div>
            {index !== cards.length - 1 && <div className={s.separator} />}
          </React.Fragment>
        ))}
      </div>
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
