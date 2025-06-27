import { Text } from "@/components/Text/Text";
import s from "./Error.module.css";
import { VscError } from "react-icons/vsc";
import { Button } from "@/components/Button/Button";

export function Error({
  title,
  subtitle,
  buttonLabel,
  onClick,
}: {
  title: string;
  subtitle: string;
  buttonLabel?: string;
  onClick?: () => void;
}) {
  return (
    <>
      <div className={s.container}>
        <VscError className={s.icon} />
        <Text variant="h5" className={s.title}>
          {title}
        </Text>
        <span className={s.separator} />
        <Text variant="sm" className={s.subtitle}>
          {subtitle}
        </Text>
      </div>
      <div className={s.button}>
        <Button
          text={buttonLabel || ""}
          size="normal"
          variant="primary"
          onClick={onClick}
        />
      </div>
    </>
  );
}
