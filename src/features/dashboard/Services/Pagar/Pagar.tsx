"use client";
import s from "./Pagar.module.css";
import { MobilePath } from "@/components/MobilePath/MobilePath";
import { Account } from "./components/Amount/Account";
import { Button } from "@/components/Button/Button";
import { Error } from "./components/Error/Error";
import { CardSelection } from "./components/CardSelection/CardSelection";
import { Succes } from "./components/Succes/Succes";
import { usePagarLogic } from "@/hooks/usePagarLogic";

export type stepTypes =
  | "ACCOUNT"
  | "CARD"
  | "SUCCES"
  | "ACCOUNT_ERROR"
  | "PAYMENT_ERROR";

export function Pagar() {
  const {
    step,
    setStep,
    account,
    setAccount,
    card,
    setCard,
    service,
    selectedCard,
    transaction,
    loading,
    nextStepAccount,
    handleSubmit,
    isValid,
    cards,
  } = usePagarLogic();

  return (
    <section className={s.pagar}>
      <MobilePath path="Pagar servicios" />

      {step === "ACCOUNT" && (
        <>
          <Account
            account={account}
            setAccount={setAccount}
            nextStep={nextStepAccount}
          />
          <div className={s.button}>
            <Button
              text="Contiunar"
              size="small"
              variant="primary"
              onClick={nextStepAccount}
              disabled={!isValid}
            />
          </div>
        </>
      )}

      {step === "ACCOUNT_ERROR" && (
        <Error
          title="No encontramos facturas asociadas a este dato"
          subtitle="Revisá el dato ingresado. Si es correcto, es posible que la empresa aún no haya cargado tu factura."
          buttonLabel="Revisar dato"
          onClick={() => setStep("ACCOUNT")}
        />
      )}

      {step === "CARD" && (
        <CardSelection
          serviceName={service?.name || ""}
          amount={service?.invoice_value || 0}
          selectedCard={card}
          setSelectedCard={setCard}
          cards={cards}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      )}

      {step === "PAYMENT_ERROR" && (
        <Error
          title="Hubo un problema con tu pago"
          subtitle="Puede deberse a fondos insuficientes
Comunicate con la entidad emisora de la tarjeta"
          buttonLabel="Volver a intentarlo"
          onClick={() => setStep("CARD")}
        />
      )}

      {step === "SUCCES" && (
        <Succes
          transaction={transaction!}
          cardNumber={selectedCard?.number_id?.toString() || ""}
        />
      )}

      {step !== null && (
        <div className={s.buttonInicio}>
          <Button text="Inicio" href="/dashboard/servicios" />
        </div>
      )}
    </section>
  );
}
