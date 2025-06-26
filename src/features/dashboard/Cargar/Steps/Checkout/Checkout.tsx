import { Text } from "@/components/Text/Text";
import { useDashboard } from "@/context/DashboardContext/DashboardContext";
import s from "./Checkout.module.css";
import { Button } from "@/components/Button/Button";
import { formatDate } from "@/utils/formatDate";
import { CiCircleCheck } from "react-icons/ci";
import { FiEdit } from "react-icons/fi";

export function Checkout({
  amount,
  submit,
  doneDate,
  loading,
  handleBack,
}: {
  amount: number;
  submit: () => void;
  doneDate: string;
  loading: boolean;
  handleBack: () => void;
}) {
  const { account } = useDashboard();
  return (
    <>
      {doneDate && (
        <div className={s.done}>
          <CiCircleCheck className={s.icon} />
          <Text variant="h6" className={s.doneText}>
            Ya cargamos el dinero en tu cuenta
          </Text>
        </div>
      )}

      <div className={s.checkout}>
        {!doneDate && (
          <>
            <Text variant="h5" className={s.title}>
              Revisá que está todo bien
            </Text>
            <span className={s.separator} />
          </>
        )}

        <div className={s.content}>
          <Text variant="sm" className={s.subtitle}>
            {doneDate ? formatDate(doneDate.toString()) : "Vas a transferir"}
          </Text>
          <Text
            variant="h6"
            className={`${s.value} ${doneDate && s.doneValue} ${s.valueEdit}`}
          >
            $ {amount}{" "}
            {!doneDate && <FiEdit className={s.edit} onClick={handleBack} />}
          </Text>
        </div>

        <div className={s.content}>
          <Text variant="sm" className={s.subtitle}>
            para
          </Text>
          <Text
            variant="h6"
            className={`${s.value} ${doneDate && s.doneValue}`}
          >
            Cuenta propia
          </Text>
        </div>

        <div className={s.content}>
          <Text variant="sm" className={s.subtitle}>
            Brubank
          </Text>
          <Text variant="h6" className={`${s.value} ${s.cvu}`}>
            CVU {account?.cvu}
          </Text>
        </div>
        {!doneDate && (
          <div className={s.button}>
            <Button
              loading={loading}
              text="Contiunar"
              variant="primary"
              onClick={submit}
            />
          </div>
        )}
      </div>
    </>
  );
}
