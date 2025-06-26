import { Text } from "@/components/Text/Text";
import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";
import s from "./Method.module.css";

export function Method({
  setStep,
}: {
  setStep: (step: "bank" | "card" | null) => void;
}) {
  return (
    <div className={s.methodsContainer}>
      <div className={s.method} role="button" onClick={() => setStep("bank")}>
        <Text variant="h5" className={s.title}>
          <Image
            width={35}
            height={35}
            src="/images/personIcon.png"
            alt="bank"
          />
          Transferencia bancaria
        </Text>
        <FaArrowRightLong className={s.arrow} />
      </div>
      <div className={s.method} role="button" onClick={() => setStep("card")}>
        <Text variant="h5" className={s.title}>
          <Image width={35} height={35} src="/images/cardIcon.png" alt="bank" />
          Seleccionar tarjeta
        </Text>
        <FaArrowRightLong className={s.arrow} />
      </div>
    </div>
  );
}
