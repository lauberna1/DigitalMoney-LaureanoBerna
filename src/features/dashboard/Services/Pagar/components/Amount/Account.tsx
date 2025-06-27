import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { Text } from "@/components/Text/Text";
import React from "react";
import s from "./Account.module.css";
export function Account({
  account,
  setAccount,
  nextStep,
}: {
  account: string | null;
  setAccount: (account: string | null) => void;
  nextStep: () => void;
}) {
  const [inputValue, setInputValue] = React.useState(account || "");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setInputValue(value);
    setAccount(value.length === 11 ? value : null);
  };

  const isValid = inputValue.length === 11;

  return (
    <div className={s.container}>
      <Text variant="h5" className={s.title}>
        Número de cuenta sin el primer 2
      </Text>

      <Input
        placeholder="account number"
        type="text"
        className={s.input}
        value={inputValue}
        onChange={handleInputChange}
        maxLength={11}
      />

      <Text variant="xs" style={{ color: "white", opacity: 0.7 }}>
        Son 11 números sin espacios, sin el “2” inicial. Agregá ceros adelante
        si tenés menos.
      </Text>

      <div className={s.button}>
        <Button
          disabled={!isValid}
          text="Continuar"
          variant="primary"
          onClick={nextStep}
        />
      </div>
    </div>
  );
}
