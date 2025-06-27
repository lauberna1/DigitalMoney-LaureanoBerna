import { Text } from "@/components/Text/Text";
import { Transaction } from "@/types/globalTypes";
import { formatDate } from "@/utils/formatDate";
import { CiCircleCheck } from "react-icons/ci";
import s from "./Succes.module.css";

export function Succes({
  transaction,
  cardNumber,
}: {
  transaction: Transaction;
  cardNumber: string;
}) {
  function maskCardNumber(cardNumber: string): string {
    if (cardNumber.length < 4) return cardNumber; // caso borde
    const visible = cardNumber.slice(-4);
    const hidden = "*".repeat(cardNumber.length - 4);
    return hidden + visible;
  }
  return (
    <>
      <div className={s.done}>
        <CiCircleCheck className={s.icon} />
        <Text variant="h6" className={s.doneText}>
          Ya realizamos tu pago
        </Text>
      </div>
      <div className={s.checkout}>
        <div className={s.content}>
          <Text variant="sm" className={s.subtitle}>
            {formatDate(transaction.dated)}
          </Text>
          <Text variant="h6" className={`${s.value}`}>
            $ {Math.abs(transaction.amount)}
          </Text>
        </div>

        <div className={s.content}>
          <Text variant="sm" className={s.subtitle}>
            para
          </Text>
          <Text variant="h6" className={`${s.value}`}>
            {transaction.description}
          </Text>
        </div>

        <div className={s.content}>
          <Text variant="sm" className={s.subtitle}>
            Tarjeta
          </Text>
          <Text variant="h6" className={`${s.card}`}>
            Visa {maskCardNumber(cardNumber)}
          </Text>
        </div>
      </div>
    </>
  );
}
