import { MobilePath } from "@/components/MobilePath/MobilePath";
import { DatosPersonales } from "./components/DatosPersonales/DatosPersonales";
import s from "./Perfil.module.css";
import { Button } from "@/components/Button/Button";
import { AccountInfo } from "./components/AccountInfo/AccountInfo";

export function Perfil() {
  return (
    <section className={s.perfil}>
      <MobilePath path="Tu perfil" />
      <DatosPersonales />
      <Button
        style={{
          justifyContent: "flex-start",
          boxShadow: "var(--shadow)",
        }}
        text="Gestioná los medios de pago"
        variant="primary"
        href="/dashboard/tarjetas"
        size="big"
        icon
      />
      <AccountInfo />
    </section>
  );
}
