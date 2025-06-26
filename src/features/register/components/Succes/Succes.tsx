import { Text } from "@/components/Text/Text";
import s from "./Succes.module.css";
import { Button } from "@/components/Button/Button";
import Image from "next/image";
export function Succes() {
  return (
    <div className={s.container}>
      <Text variant="h1" className={s.title}>
        Registro Exitoso
      </Text>
      <Image alt="succes" src="/images/Succes.png" className={s.image} />
      <Button text="Continuar" variant="primary" href="/login" />
    </div>
  );
}
