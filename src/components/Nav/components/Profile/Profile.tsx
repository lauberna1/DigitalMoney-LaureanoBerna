"use client";
import { Text } from "@/components/Text/Text";
import { useAuth } from "@/context/AuthContext/AuthContext";
import { IoMenu } from "react-icons/io5";
import s from "./Profile.module.css";
import { useRouter } from "next/navigation";

export function Profile({ handleOpenClose }: { handleOpenClose: () => void }) {
  const { user } = useAuth();
  const router = useRouter();
  const initials =
    (user?.firstname?.[0]?.toUpperCase() ?? "") +
    (user?.lastname?.[0]?.toUpperCase() ?? "");

  return (
    <div className={s.profile}>
      <div className={s.content} onClick={() => router.push("/dashboard")}>
        <Text variant="h4" className={s.initials}>
          {initials}
        </Text>
        <Text variant="md" className={s.name}>
          Hola, {user?.firstname} {user?.lastname}
        </Text>
      </div>

      <IoMenu role="button" className={s.icon} onClick={handleOpenClose} />
    </div>
  );
}
