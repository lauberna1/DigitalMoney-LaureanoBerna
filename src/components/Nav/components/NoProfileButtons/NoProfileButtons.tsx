import { Button } from "@/components/Button/Button";
import s from "./NoProfileButtons.module.css";
export const NoProfilButtons = ({ pathname }: { pathname: string }) => {
  if (pathname === "/register") {
    return (
      <div className={s.buttons}>
        <Button
          text="Iniciar sesión"
          variant="fourth"
          size="small"
          href="/login"
        />
      </div>
    );
  }

  if (pathname === "/login") {
    return;
  }

  return (
    <div className={s.buttons}>
      <Button text="Ingresar" variant="secondary" size="small" href="/login" />
      <Button
        size="small"
        text="Crear cuenta"
        variant="primary"
        href="/register"
      />
    </div>
  );
};
