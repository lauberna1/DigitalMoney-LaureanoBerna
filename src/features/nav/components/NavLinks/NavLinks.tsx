"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import s from "./NavLinks.module.css";
import { useAuth } from "@/context/AuthContext/AuthContext";

export const NavLinks = ({ onClick = () => {} }: { onClick?: () => void }) => {
  const pathname = usePathname();
  const { logout } = useAuth();
  const links = [
    { href: "/dashboard", label: "Inicio" },
    { href: "/dashboard/actividad", label: "Actividad" },
    { href: "/dashboard/perfil", label: "Tu perfil" },
    { href: "/dashboard/cargar", label: "Cargar dinero" },
    { href: "/dashboard/pagar", label: "Pagar servicios" },
    { href: "/dashboard/tarjetas", label: "Tarjetas" },
  ];

  return (
    <>
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          onClick={onClick}
          className={`${s.link} ${pathname === href ? s.active : ""}`}
        >
          {label}
        </Link>
      ))}

      <p
        onClick={() => {
          onClick();
          logout();
        }}
        className={`${s.link} ${s.closeSession}`}
      >
        Cerrar sesión
      </p>
    </>
  );
};
