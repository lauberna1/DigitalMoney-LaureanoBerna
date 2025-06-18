"use client";
import { MobilePath } from "@/components/MobilePath/MobilePath";
import s from "./Agregar.module.css";
import { Form } from "../Agregar/components/Form/Form";

export function Agregar() {
  return (
    <section className={s.agregar}>
      <MobilePath path="Tarjetas" />
      <Form />
    </section>
  );
}
