"use client";
import { Text } from "@/components/Text/Text";
import s from "./page.module.css";

export default function Home() {
  return (
    <section className={s.container}>
      <div className={s.hero}>
        <span className={s.heroImage} />
        <div className={s.heroContent}>
          <Text className={s.heroTitle} variant="h1">
            De ahora en adelante, hacés más con tu dinero
          </Text>
          <span className={s.heroSeparator} />
          <Text className={s.heroDes} variant="md">
            Tu nueva <strong>billetera virtual</strong>
          </Text>
        </div>
      </div>
      <div className={s.about}>
        <div className={s.content}>
          <Card
            title="Transferí dinero"
            description="Desde Digital Money House vas a poder transferir dinero a otras cuentas, asi como también recibir transferencias y nuclear tu capital en nuestra billetera virtual."
          />
          <Card
            title="Pago de servicios"
            description="Pagá mensualmente los servicios en 3 simples clicks. Facil, rápido y conveniente. Olvidate de las facturas en papel."
          />
        </div>
      </div>
    </section>
  );
}

const Card = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className={s.card}>
      <Text className={s.title} variant="h3">
        {title}
      </Text>
      <span className={s.separator} />
      <Text className={s.des} variant="md">
        {description}
      </Text>
    </div>
  );
};
