import { NavLinks } from "@/components/Nav/components/NavLinks/NavLinks";
import s from "./Sidebar.module.css";
export default function Sidebar() {
  return (
    <div className={s.sidebar}>
      <NavLinks />
    </div>
  );
}
