import { Text } from "@/components/Text/Text";
import s from "./Tarjetas.module.css";
import { Card } from "@/types/globalTypes";
import { BounceLoader } from "react-spinners";
import React from "react";

export default function Tarjetas({
  cards,
  selectedCard,
  handleCardChange,
}: {
  cards: Card[] | null;
  selectedCard: string | null;
  handleCardChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
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
  );
}
