import s from "./FilterButton.module.css";
import { VscSettings } from "react-icons/vsc";

export function FilterButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className={s.filterButton}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      Filtrar
      <VscSettings className={s.icon} />
    </button>
  );
}
