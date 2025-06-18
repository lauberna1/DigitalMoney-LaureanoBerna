import s from "./Search.module.css";
import { IoSearchSharp } from "react-icons/io5";

export function Search({
  onChange,
  value,
  onKeyDown,
}: {
  onChange: (value: string) => void;
  value: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className={s.search}>
      <IoSearchSharp className={s.searchIcon} size={22} />
      <input
        onKeyDown={onKeyDown}
        type="text"
        placeholder="Buscar en tu actividad"
        className={s.input}
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
    </div>
  );
}
