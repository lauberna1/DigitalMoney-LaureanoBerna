import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { useDashboard } from "@/context/DashboardContext/DashboardContext";
import { useDashboardHook } from "@/hooks/useDashboardHook";
import { Service, Transaction } from "@/types/globalTypes";
import { stepTypes } from "@/features/dashboard/Services/Pagar/Pagar";

export const ACCOUNT_NUMER_ERROR = "00000000000";

export function usePagarLogic() {
  const { cards, makePaymentData, account: accountData } = useDashboard();
  const params = useParams();
  const { id } = params;
  const { getService } = useDashboardHook();

  const [step, setStep] = useState<stepTypes>("ACCOUNT");
  const [account, setAccount] = useState<string | null>(null);
  const [card, setCard] = useState<string | null>(null);
  const [service, setService] = useState<Service | null>(null);
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(false);

  const isValid = account?.length === 11;

  const selectedCard = cards?.find((c) => c.id.toString() === card);

  const nextStepAccount = () => {
    if (account === ACCOUNT_NUMER_ERROR) {
      setStep("ACCOUNT_ERROR");
    } else {
      setStep("CARD");
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const invoiceValue = service?.invoice_value || 0;
      const availableAmount = accountData?.available_amount ?? 0;
      if (availableAmount < invoiceValue) {
        toast.error("No tienes suficiente dinero");
        setStep("PAYMENT_ERROR");
        return;
      }
      const result = await makePaymentData({
        amount: -Math.abs(invoiceValue),
        dated: new Date().toISOString(),
        description: service?.name || "",
      });
      if (result?.transaction) {
        setTransaction(result.transaction);
        setStep("SUCCES");
        toast.success("Pago realizado");
      }
    } catch {
      toast.error("Error al realizar el pago");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function getServiceEffect() {
      try {
        if (!id) return;
        const service = await getService(id.toString());
        setService(service.service);
      } catch {
        toast.error("Error al obtener el servicio");
      }
    }
    getServiceEffect();
  }, [getService, id]);

  useEffect(() => {
    if (cards?.length) {
      setCard(cards[0].id.toString());
    }
  }, [cards]);

  return {
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
  };
}
