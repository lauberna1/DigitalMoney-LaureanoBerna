"use client";
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { Text } from "@/components/Text/Text";
import { useAuthHook } from "@/hooks/useAuthHook";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./RegisterForm.module.css";

import { registerSchema } from "@/schema/registerSchema";
import { Succes } from "../Succes/Succes";
import { RegisterFormData } from "@/types/registerTypes";
import { toast } from "react-toastify";

export default function RegisterForm() {
  /* STATES */
  const [succes, setSucces] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  /* HOOKS */
  const { registerUser } = useAuthHook();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  /* HANDLERS */
  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    setError(false);
    try {
      await registerUser(data);
      toast.success("Cuenta creada");
      setSucces(true);
    } catch {
      setError(true);
      toast.error("Error al crear la cuenta");
    } finally {
      setLoading(false);
    }
  };
  if (succes) {
    return <Succes />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Text
        variant="h5"
        style={{
          color: "white",
          fontWeight: "600",
        }}
      >
        Crear cuenta
      </Text>
      <div className={styles.grid}>
        <Input
          placeholder="Nombre*"
          {...register("firstName")}
          error={errors.firstName?.message}
        />
        <Input
          placeholder="Apellido*"
          {...register("lastName")}
          error={errors.lastName?.message}
        />
        <Input
          placeholder="DNI*"
          {...register("dni")}
          error={errors.dni?.message}
          type="number"
        />
        <Input
          placeholder="Correo electrónico*"
          {...register("email")}
          error={errors.email?.message}
        />
        <div className={styles.passwordHelp}>
          Usa entre 6 y 20 caracteres (debe contener al menos 1 carácter
          especial, una mayúscula y un número)
        </div>
        <Input
          type="password"
          placeholder="Contraseña*"
          {...register("password")}
          error={errors.password?.message}
        />
        <Input
          type="password"
          placeholder="Confirmar contraseña*"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />
        <Input
          type="tel"
          placeholder="Teléfono*"
          {...register("phone")}
          error={errors.phone?.message}
        />
        <Button
          text="Crear cuenta"
          size="custom"
          variant="primary"
          type="submit"
          style={{
            width: "min(360px, 100%)",
            height: "64px",
            borderRadius: "10px",
          }}
          loading={loading}
        />
        {error && (
          <Text variant="xs" className={styles.errorText}>
            Error al crear la cuenta
          </Text>
        )}
      </div>
    </form>
  );
}
