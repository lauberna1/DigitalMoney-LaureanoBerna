/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/Button/Button";
import Link from "next/link";
import s from "./Nav.module.css";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext/AuthContext";

export function Nav() {
  /* HOOKS */
  const pathname = usePathname();
  const { user } = useAuth();

  /* UTILS */
  const isAuthPage = pathname === "/login" || pathname === "/register";

  return (
    <header className={`${s.nav} ${isAuthPage ? s.authNav : ""}`}>
      <Link
        href="/"
        style={{
          all: "unset",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={isAuthPage ? "/images/logo2.png" : "/images/logo.png"}
          alt="logo"
          className={`${s.logo} ${isAuthPage ? s.logoAlt : ""}`}
        />
      </Link>

      {user && "profile"}
      {!user && (
        <div className={s.buttons}>
          <NoProfilButtons pathname={pathname} />
        </div>
      )}
    </header>
  );
}

const NoProfilButtons = ({ pathname }: { pathname: string }) => {
  if (pathname === "/register") {
    return (
      <Button
        text="Iniciar sesión"
        variant="fourth"
        size="small"
        href="/login"
      />
    );
  }

  if (pathname === "/login") {
    return;
  }

  return (
    <>
      <Button text="Ingresar" variant="secondary" size="small" href="/login" />
      <Button
        size="small"
        text="Crear cuenta"
        variant="primary"
        href="/register"
      />
    </>
  );
};
