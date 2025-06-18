import { MobilePath } from "@/components/MobilePath/MobilePath";
import s from "./Tarjetas.module.css";
import { AddCard } from "./components/AddCard/AddCard";
import { TarjetasList } from "./components/TarjetasList/TarjetasList";

export function Tarjetas() {
  return (
    <section className={s.tarjetas}>
      <MobilePath path="Tarjetas" />
      <AddCard />
      <TarjetasList />
    </section>
  );
}
