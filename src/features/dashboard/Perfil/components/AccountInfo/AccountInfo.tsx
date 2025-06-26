"use client";
import { useState, useEffect } from "react";
import { Text } from "@/components/Text/Text";
import { useDashboard } from "@/context/DashboardContext/DashboardContext";
import { MdContentCopy, MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import s from "./AccountInfo.module.css";
import { IoMdClose } from "react-icons/io";
import { Button } from "@/components/Button/Button";

// Validación del alias: 3 palabras separadas por punto
const schema = yup.object({
  alias: yup
    .string()
    .required("El alias es obligatorio")
    .matches(
      /^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+){2}$/,
      "El alias debe tener 3 palabras separadas por '.'"
    ),
});

export function AccountInfo({ edit = true }: { edit?: boolean }) {
  const { account, updateAliasData } = useDashboard();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { alias: account?.alias || "" },
  });

  useEffect(() => {
    reset({ alias: account?.alias || "" });
  }, [account, reset]);

  const handleCopy = async (text: string) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      toast("Copiado");
    } catch (err) {
      console.error("Error al copiar al portapapeles:", err);
    }
  };

  const onSubmit = async (data: { alias: string }) => {
    try {
      setLoading(true);
      await updateAliasData(data);
      toast.success("Alias actualizado correctamente");
      setIsEditing(false);
    } catch {
      toast.error("Error al guardar alias");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={s.accountInfo}>
        <Text variant="h6" className={s.title}>
          Copia tu CVU o alias para ingresar o transferir dinero desde otra
          cuenta
        </Text>

        {/* CVU */}
        <div className={s.content}>
          <div className={s.item}>
            <Text variant="h5" className={s.subtitle}>
              CVU
            </Text>
            <Text variant="md" className={s.value}>
              {account?.cvu || "-"}
            </Text>
          </div>
          <MdContentCopy
            className={`${s.copy} ${!account?.cvu ? s.disabled : ""}`}
            onClick={() => handleCopy(account?.cvu || "")}
          />
        </div>

        <span className={s.separator} />

        {/* Alias */}
        <form onSubmit={handleSubmit(onSubmit)} className={s.content}>
          <div className={s.item}>
            <Text variant="h5" className={s.subtitle}>
              Alias
            </Text>

            {isEditing ? (
              <div className={s.inputCont}>
                <input
                  {...register("alias")}
                  className={s.input}
                  autoFocus
                  placeholder="alias.tres.palabras"
                />
                {errors.alias && (
                  <span className={s.error}>{errors.alias.message}</span>
                )}
              </div>
            ) : (
              <Text variant="md" className={s.value}>
                {account?.alias || "-"}
              </Text>
            )}
          </div>

          <div className={s.editCont}>
            {edit &&
              (!isEditing ? (
                <MdEdit
                  className={s.edit}
                  onClick={() => setIsEditing(true)}
                  title="Editar alias"
                />
              ) : (
                <IoMdClose
                  title="cancelar"
                  className={s.cancel}
                  onClick={() => setIsEditing(false)}
                />
              ))}
            <MdContentCopy
              className={`${s.copy} ${!account?.alias ? s.disabled : ""}`}
              onClick={() => handleCopy(account?.alias || "")}
            />
          </div>
        </form>
      </div>
      {/* Guardar cambios */}
      {isEditing && (
        <Button
          size="small"
          variant="primary"
          type="submit"
          onClick={handleSubmit(onSubmit)}
          text="Guardar"
          loading={loading}
        />
      )}
    </>
  );
}
