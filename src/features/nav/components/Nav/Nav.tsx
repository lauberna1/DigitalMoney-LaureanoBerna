/* eslint-disable @next/next/no-img-element */
"use client";

import { useAuth } from "@/context/AuthContext/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Menu } from "../Menu/Menu";
import { NoProfilButtons } from "../NoProfileButtons/NoProfileButtons";
import { Profile } from "../Profile/Profile";
import s from "./Nav.module.css";

export function Nav() {
  /* STATES */
  const [open, setOpen] = useState(false);

  /* HOOKS */
  const pathname = usePathname();
  const { user } = useAuth();

  /* UTILS */
  const isAuthPage = pathname === "/login" || pathname === "/register";
  const handleOpenClose = () => setOpen(!open);

  /* EFFECTS */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

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
      {user && <Profile handleOpenClose={handleOpenClose} />}
      {!user && <NoProfilButtons pathname={pathname} />}
      <Menu handleOpenClose={handleOpenClose} open={open} />
    </header>
  );
}
