
import { useState, useEffect } from "react";
import { useDashboard } from "@/context/DashboardContext/DashboardContext";
import { toast } from "react-toastify";

export function useCargarLogic() {
  const [step, setStep] = useState<"bank" | "card" | null>(null);
  const [subStep, setSubStep] = useState<
    "cardSelection" | "amount" | "check" | "done"
  >("cardSelection");
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const [doneDate, setDoneDate] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(false);

  const { cards, depositMoneyData } = useDashboard();

  useEffect(() => {
    if (cards?.length) setSelectedCard(cards[0].id.toString());
  }, [cards]);

  const submit = async () => {
    if (amount === null) return;
    try {
      setLoading(true);
      const result = await depositMoneyData({
        amount,
        dated: new Date().toISOString(),
      });
      if (result?.deposit) {
        setDoneDate(result.deposit.dated);
        setSubStep("done");
        toast.success("Dinero depositado");
      } else {
        toast.error("No se pudo realizar el depósito");
      }
    } catch {
      toast.error("Error al depositar dinero");
    } finally {
      setLoading(false);
    }
  };

  return {
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
    cards,
  };
}
