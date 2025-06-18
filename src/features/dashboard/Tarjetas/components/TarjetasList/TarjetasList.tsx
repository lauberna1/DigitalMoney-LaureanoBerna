"use client";
import { Text } from "@/components/Text/Text";
import { useDashboard } from "@/context/DashboardContext/DashboardContext";
import React from "react";
import { BounceLoader } from "react-spinners";
import { toast } from "react-toastify";
import s from "./TarjetasList.module.css";
export function TarjetasList() {
  const { cards, deleteCardData } = useDashboard();

  const deleteCard = async (cardId: number) => {
    try {
      await deleteCardData({ cardId });
      toast.success("Tarjeta eliminada");
    } catch {
      toast.error("Error al eliminar la tarjeta");
    }
  };

  return (
    <div className={s.tarjetasList}>
      <Text variant="h6" className={s.title}>
        Tus tarjetas
      </Text>
      <span className={s.separator} />
      <div className={s.content}>
        {cards === null && (
          <div className={s.loader}>
            <BounceLoader size="50px" />
          </div>
        )}

        {cards && cards.length === 0 && (
          <div className={s.noCards}>No tienes tarjetas</div>
        )}

        {cards &&
          cards.length > 0 &&
          cards.map((card) => {
            const lastFour = card.number_id.toString().slice(-4);
            return (
              <React.Fragment key={card.id}>
                <div className={s.item}>
                  <span className={s.dot} />
                  <Text variant="sm" className={s.cardName}>
                    Terminada en {lastFour}
                  </Text>

                  <button
                    className={s.delete}
                    onClick={async () => {
                      await deleteCard(card.id);
                    }}
                  >
                    Eliminar
                  </button>
                </div>
                <span className={s.separator} />
              </React.Fragment>
            );
          })}
      </div>
    </div>
  );
}
