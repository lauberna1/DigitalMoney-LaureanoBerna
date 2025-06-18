import { Text } from "@/components/Text/Text";
import s from "./Succes.module.css";
import { Button } from "@/components/Button/Button";
export function Succes() {
  return (
    <div className={s.container}>
      <Text variant="h1" className={s.title}>
        Registro Exitoso
      </Text>
      <img src="/images/Succes.png" className={s.image} />
      <Button text="Continuar" variant="primary" href="/login" />
    </div>
  );
}
