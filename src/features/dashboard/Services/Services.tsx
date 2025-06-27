"use client";
import { useDashboard } from "@/context/DashboardContext/DashboardContext";
import { Search } from "../Inicio/components/Search/Search";
import { ServiciosList } from "./components/ServiciosList/ServiciosList";
import s from "./Services.module.css";
import { useState } from "react";
import { MobilePath } from "@/components/MobilePath/MobilePath";

export function Services() {
  const { services } = useDashboard();
  const [search, setSearch] = useState("");

  const filteredServices =
    services?.filter((service) =>
      service.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    ) || [];

  return (
    <section className={s.services}>
      <MobilePath path="Pagar servicios" />
      <Search
        onChange={setSearch}
        value={search}
        placeholder="Buscá entre más de 5.000 empresas"
      />
      <ServiciosList services={filteredServices} />
    </section>
  );
}
