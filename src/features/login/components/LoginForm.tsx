"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { EmailStepData, FullStepData } from "../types/types";
import s from "./LoginForm.module.css";
import { FaArrowLeftLong } from "react-icons/fa6";

import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { Text } from "@/components/Text/Text";
import { loginSchema } from "@/schema/loginSchema";
import { useState } from "react";
import { useAuthHook } from "@/hooks/useAuthHook";
import { useAuth } from "@/context/AuthContext/AuthContext";

export function LoginForm() {
  /* STATES */
  const [step, setStep] = useState<"email" | "password">("email");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  /* HOOKS */
  const { loginUser } = useAuthHook();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FullStepData>({
    resolver: yupResolver(
      step === "email" ? loginSchema.pick(["email"]) : loginSchema
    ),
  });

  /* HANDLERS */
  const onSubmit = async (data: EmailStepData | FullStepData) => {
    setError(false);
    if (step === "email") {
      setStep("password");
    }
    if (step === "password") {
      try {
        setLoading(true);
        const { JWT } = await loginUser(data as FullStepData);
        login(JWT);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
  };

  function retry() {
    setError(false);
    setLoading(false);
    setStep("email");
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <Text variant="h5" className={s.title}>
        {step === "email"
          ? "¡Hola! Ingresá tu e-mail"
          : "Ingresá tu contraseña"}{" "}
      </Text>
      {step === "email" && (
        <Input
          className={s.input}
          placeholder="Correo electrónico*"
          {...register("email")}
          error={errors.email?.message}
        />
      )}
      {step === "password" && (
        <Input
          className={s.input}
          type="password"
          placeholder="Contraseña*"
          {...register("password")}
          error={errors.password?.message}
        />
      )}
      <Button
        loading={loading}
        text="Continuar"
        type="submit"
        variant="primary"
        size="normal"
      />
      {error && (
        <div className={s.errorLogin} onClick={retry}>
          <FaArrowLeftLong className={s.errorIcon} />
          <Text variant="xs" className={s.errorText}>
            Error al iniciar sesión intentalo de nuevo
          </Text>
        </div>
      )}
      {step === "email" && (
        <Button
          text="Crear cuenta"
          href="/register"
          variant="tertiary"
          size="normal"
          style={{
            backgroundColor: "rgba(206, 206, 206, 1) ",
          }}
        />
      )}
    </form>
  );
}
