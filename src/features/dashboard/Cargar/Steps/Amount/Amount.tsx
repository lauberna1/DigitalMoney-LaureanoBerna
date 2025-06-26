import { Input } from "@/components/Input/Input";
import { Text } from "@/components/Text/Text";
import React from "react";
import s from "./Amount.module.css";
import { Button } from "@/components/Button/Button";
export function Amount({
  amount,
  setAmount,
  nextStep,
}: {
  amount: number | null;
  setAmount: (amount: number | null) => void;
  nextStep: () => void;
}) {
  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseFloat(e.target.value));
  };

  return (
    <div className={s.container}>
      <Text variant="h5" className={s.title}>
        ¿Cuánto querés ingresar a la cuenta?
      </Text>

      <Input
        min={0}
        placeholder="$"
        type="number"
        className={s.input}
        onChange={handleCardChange}
        value={amount || ""}
      />
      <div className={s.button}>
        <Button
          disabled={!amount || amount <= 0}
          text="Contiunar"
          variant="primary"
          onClick={nextStep}
        />
      </div>
    </div>
  );
}
