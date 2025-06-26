"use client";
import { Button } from "@/components/Button/Button";
import { MobilePath } from "@/components/MobilePath/MobilePath";
import { Actividad } from "../Actividad/Actividad";
import { Balance } from "./components/Balance/Balance";
import s from "./Inicio.module.css";
import { Suspense } from "react";
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

      <Suspense>
        <Actividad isHome={true} />
      </Suspense>
    </section>
  );
}
