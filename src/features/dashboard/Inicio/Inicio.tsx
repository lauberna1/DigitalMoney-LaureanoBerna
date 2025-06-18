import { Button } from "@/components/Button/Button";
import { Activity } from "./components/Activity/Activity";
import { Balance } from "./components/Balance/Balance";
import s from "./Inicio.module.css";
import { MobilePath } from "@/components/MobilePath/MobilePath";
export default function Inicio() {
  return (
    <section className={s.inicio}>
      <MobilePath path="Inicio" />
      <Balance />
      <div className={s.buttons}>
        <Button
          style={{
            boxShadow: "var(--shadow)",
          }}
          text="Ingresar dinero"
          variant="primary"
          href="/dashboard/cargar"
          size="big"
        />
        <Button
          style={{
            boxShadow: "var(--shadow)",
          }}
          text="Pago de servicios"
          variant="primary"
          href="/dashboard/pagar"
          size="big"
        />
      </div>

      <Activity />
    </section>
  );
}
