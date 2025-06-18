import { Text } from "@/components/Text/Text";
import { useAuth } from "@/context/AuthContext/AuthContext";
import { IoClose } from "react-icons/io5";
import { NavLinks } from "../NavLinks/NavLinks";
import s from "./Menu.module.css";
import { useRouter } from "next/navigation";

export const Menu = ({
  handleOpenClose,
  open,
}: {
  handleOpenClose: () => void;
  open: boolean;
}) => {
  const { user } = useAuth();
  const router = useRouter();
  return (
    <div className={` ${s.menu} ${open ? s.open : ""}`}>
      <header className={s.header}>
        <IoClose className={s.icon} onClick={handleOpenClose} />
        <Text
          variant="h6"
          className={s.name}
          onClick={() => {
            handleOpenClose();
            router.push("/dashboard");
          }}
        >
          <span>Hola,</span> {user?.firstname} {user?.lastname}
        </Text>
      </header>
      <div className={s.content}>
        <NavLinks onClick={handleOpenClose} />
      </div>
    </div>
  );
};
