"use client";
import { Button } from "@/components/Button/Button";
import { useState } from "react";
import s from "./Filters.module.css";
import { Text } from "@/components/Text/Text";

const Filters = ({
  isOpen,
  handleFilter,
  onClose,
  setSearch,
}: {
  isOpen: boolean;
  handleFilter: (period: string) => void;
  onClose: () => void;
  setSearch: (value: string) => void;
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState("");

  const handlePeriodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPeriod(e.target.value);
  };

  if (!isOpen) return null;

  return (
    <main className={s.modal} onClick={(e) => e.stopPropagation()}>
      <div className={s.header}>
        <Text variant="h6" className={s.title}>
          Período
        </Text>
        <Text
          variant="md"
          className={s.clear}
          onClick={() => {
            setSelectedPeriod("");
            handleFilter("");
            setSearch("");
            onClose();
          }}
        >
          Borrar filtros
        </Text>
      </div>
      <div className={s.content}>
        <div className={s.period}>
          <label
            className={` ${s.label} ${selectedPeriod === "today" && s.checked}`}
          >
            Hoy
          </label>
          <input
            className={s.input}
            type="radio"
            id="today"
            name="period"
            value="today"
            checked={selectedPeriod === "today"}
            onChange={handlePeriodChange}
          />
        </div>
        <div className={s.period}>
          <label
            className={`${s.label} ${
              selectedPeriod === "yesterday" && s.checked
            }`}
            htmlFor="yesterday"
          >
            Ayer
          </label>
          <input
            className={s.input}
            type="radio"
            id="yesterday"
            name="period"
            value="yesterday"
            checked={selectedPeriod === "yesterday"}
            onChange={handlePeriodChange}
          />
        </div>
        <div className={s.period}>
          <label
            className={`${s.label} ${
              selectedPeriod === "lastWeek" && s.checked
            }`}
            htmlFor="lastWeek"
          >
            Ultima semana
          </label>
          <input
            className={s.input}
            type="radio"
            id="lastWeek"
            name="period"
            value="lastWeek"
            checked={selectedPeriod === "lastWeek"}
            onChange={handlePeriodChange}
          />
        </div>
        <div className={s.period}>
          <label
            className={`${s.label} ${
              selectedPeriod === "last15Days" && s.checked
            }`}
            htmlFor="last15Days"
          >
            Ultimos 15 dias
          </label>

          <input
            className={s.input}
            type="radio"
            id="last15Days"
            name="period"
            value="last15Days"
            checked={selectedPeriod === "last15Days"}
            onChange={handlePeriodChange}
          />
        </div>
        <div className={s.period}>
          <label
            className={`${s.label} ${
              selectedPeriod === "lastMonth" && s.checked
            }`}
            htmlFor="lastMonth"
          >
            Último mes
          </label>
          <input
            className={s.input}
            type="radio"
            id="lastMonth"
            name="period"
            value="lastMonth"
            checked={selectedPeriod === "lastMonth"}
            onChange={handlePeriodChange}
          />
        </div>
        <div className={s.period}>
          <label
            className={`${s.label} ${
              selectedPeriod === "last3Months" && s.checked
            }`}
            htmlFor="last3Months"
          >
            Último año
          </label>
          <input
            className={s.input}
            type="radio"
            id="last3Months"
            name="period"
            value="last3Months"
            checked={selectedPeriod === "last3Months"}
            onChange={handlePeriodChange}
          />
        </div>
      </div>
      <div className={s.button}>
        <Button
          size="small"
          text="Aplicar"
          onClick={() => {
            handleFilter(selectedPeriod);
            onClose();
          }}
        />
      </div>
    </main>
  );
};

export default Filters;
