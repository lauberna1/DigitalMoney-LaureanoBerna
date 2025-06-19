"use client";
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { useDashboard } from "@/context/DashboardContext/DashboardContext";
import { addCardSchema } from "@/schema/addCardSchema";
import { CardData } from "@/types/globalTypes";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import s from "./Form.module.css";
export function Form() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { cards } = useDashboard();
  const [focused, setFocused] = useState<
    "number" | "name" | "expiry" | "cvc" | ""
  >("");
  const { addCardData } = useDashboard();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    resolver: yupResolver(addCardSchema),
    mode: "onChange",
  });

  const state = watch();

  const onSubmit = async (data: CardData) => {
    try {
      if (cards?.length === 10) {
        toast.error("No puedes agregar más de 10 tarjetas");
        return;
      }
      setLoading(true);
      await addCardData(data);
      toast.success("Tarjeta guardada");
      router.push("/dashboard/tarjetas");
    } catch {
      toast.error("Error al guardar la tarjeta");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (cards?.length === 10) {
      router.push("/dashboard/tarjetas");
    }
  }, []);

  return (
    <div className={s.container}>
      <Cards
        number={state.number || ""}
        expiry={state.expiration || ""}
        cvc={state.cvv || ""}
        name={state.fullName || ""}
        focused={focused}
      />

      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          className={s.input}
          maxLength={16}
          placeholder="Número de tarjeta*"
          {...register("number")}
          onFocus={() => setFocused("number")}
          error={errors.number?.message}
        />

        <Input
          className={s.input}
          placeholder="Nombre y apellido*"
          {...register("fullName")}
          onFocus={() => setFocused("name")}
          error={errors.fullName?.message}
        />

        <Input
          className={`${s.input} ${s.last}`}
          placeholder="Fecha de vencimiento*"
          {...register("expiration")}
          onFocus={() => setFocused("expiry")}
          maxLength={7}
          error={errors.expiration?.message}
        />

        <Input
          className={`${s.input} ${s.last}`}
          placeholder="Código de seguridad*"
          {...register("cvv")}
          onFocus={() => setFocused("cvc")}
          maxLength={4}
          error={errors.cvv?.message}
        />
        <div className={s.button}>
          <Button
            type="submit"
            text="Guardar"
            variant={isValid ? "primary" : "tertiary"}
            loading={loading}
            disabled={!isValid}
          />
        </div>
      </form>
    </div>
  );
}
