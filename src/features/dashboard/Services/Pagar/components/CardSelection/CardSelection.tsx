import { Text } from "@/components/Text/Text";

import Tarjetas from "@/features/dashboard/Cargar/Steps/Tarjetas/Tarjetas";
import { Card } from "@/types/globalTypes";
import Link from "next/link";
import s from "./CardSelection.module.css";
import { Button } from "@/components/Button/Button";

export function CardSelection({
  serviceName,
  amount,
  selectedCard,
  setSelectedCard,
  cards,
  handleSubmit,
  loading,
}: {
  serviceName: string;
  amount: number;
  selectedCard: string | null;
  setSelectedCard: (cardId: string | null) => void;
  cards: Card[] | null;
  handleSubmit: () => void;
  loading: boolean;
}) {
  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCard(e.target.value);
  };

  return (
    <>
      <div className={s.container}>
        <div className={s.header}>
          <Text variant="h4" className={s.title}>
            {serviceName}
          </Text>
          <Link className={s.link} href="/dashboard/servicios">
            Ver detalles del pago
          </Link>
        </div>
        <span className={s.separator} />
        <div className={s.content}>
          <Text variant="h4" className={s.totalTitle}>
            Total a pagar
          </Text>
          <Text variant="h4" className={s.totalValue}>
            $ {amount}
          </Text>
        </div>
      </div>
      <Tarjetas
        cards={cards}
        selectedCard={selectedCard}
        handleCardChange={handleCardChange}
      />
      <div className={s.button}>
        <Button
          text="Pagar"
          size="small"
          variant="primary"
          disabled={!selectedCard}
          loading={loading}
          onClick={handleSubmit}
        />
      </div>
    </>
  );
}
