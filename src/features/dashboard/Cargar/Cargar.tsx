"use client";
import { Button } from "@/components/Button/Button";
import { MobilePath } from "@/components/MobilePath/MobilePath";
import { AccountInfo } from "../Perfil/components/AccountInfo/AccountInfo";
import { Amount } from "./Steps/Amount/Amount";
import { CardSelection } from "./Steps/CardSelection/CardSelection";
import { Checkout } from "./Steps/Checkout/Checkout";
import { Method } from "./Steps/Method/Method";
import s from "./Cargar.module.css";
import { useCargarLogic } from "@/hooks/useCargarLogic";

export function Cargar() {
  const {
    step,
    setStep,
    subStep,
    setSubStep,
    selectedCard,
    setSelectedCard,
    amount,
    setAmount,
    doneDate,
    loading,
    submit,
  } = useCargarLogic();

  return (
    <section className={s.cargar}>
      <MobilePath path="Cargar dinero" onClick={() => setStep(null)} />

      {step === null && <Method setStep={setStep} />}

      {step === "bank" && <AccountInfo edit={false} />}

      {step === "card" && subStep === "cardSelection" && (
        <>
          <CardSelection
            selectedCard={selectedCard}
            setSelectedCard={setSelectedCard}
            nextStep={() => setSubStep("amount")}
          />
          <div className={s.button}>
            <Button
              disabled={!selectedCard}
              text="Contiunar"
              size="small"
              variant="primary"
              onClick={() => setSubStep("amount")}
            />
          </div>
        </>
      )}

      {step === "card" && subStep === "amount" && (
        <>
          <Amount
            amount={amount}
            setAmount={setAmount}
            nextStep={() => setSubStep("check")}
          />
          <div className={s.button}>
            <Button
              text="Contiunar"
              size="small"
              variant="primary"
              onClick={() => setSubStep("check")}
              disabled={!amount || amount <= 0}
            />
          </div>
        </>
      )}

      {step === "card" &&
        (subStep === "check" || subStep === "done") &&
        amount !== null && (
          <>
            <Checkout
              amount={amount}
              submit={submit}
              doneDate={doneDate as string}
              loading={loading}
              handleBack={() => setSubStep("amount")}
            />
            {!doneDate && (
              <div className={s.button}>
                <Button
                  text="Contiunar"
                  size="small"
                  variant="primary"
                  onClick={submit}
                  loading={loading}
                />
              </div>
            )}
          </>
        )}

      {step !== null && (
        <div className={s.buttonInicio}>
          <Button
            text="Inicio"
            size="small"
            onClick={() => {
              setStep(null);
              setSubStep("cardSelection");
            }}
            href={doneDate ? "/dashboard" : undefined}
          />
        </div>
      )}
    </section>
  );
}
