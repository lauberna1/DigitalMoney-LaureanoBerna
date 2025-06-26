"use client";
import { Button } from "@/components/Button/Button";
import { Text } from "@/components/Text/Text";
import { useAuth } from "@/context/AuthContext/AuthContext";
import { useDashboard } from "@/context/DashboardContext/DashboardContext";
import { useDashboardHook } from "@/hooks/useDashboardHook";
import { FormData } from "@/types/ProfileTypes";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { MdEdit } from "react-icons/md";
import s from "./DatosPersonales.module.css";
import { editProfileSchema } from "@/schema/editProfileSchema";
import { toast } from "react-toastify";

export function DatosPersonales() {
  const { user, token, setUser } = useAuth();
  const { updateUser } = useDashboardHook();
  const { account } = useDashboard();

  const [editingField, setEditingField] = useState<null | keyof FormData>(null);
  const [loading, setLoading] = useState(false);
  const originalValues = useRef<FormData | null>(null);

  const nameRef = useRef<HTMLInputElement>(null);
  const dniRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(editProfileSchema),
    defaultValues: {
      name: "-",
      dni: "-",
      phone: "-",
    },
  });

  const watchedValues = watch();
  const hasChanges =
    JSON.stringify(originalValues.current) !== JSON.stringify(watchedValues);

  const handleEdit = (field: keyof FormData) => {
    setEditingField(field);
  };

  const onSubmit = async (data: FormData) => {
    if (!token || !account?.user_id) return;

    const [firstname, lastname] = data.name.trim().split(" ");
    const updatedData = {
      dni: parseInt(data.dni),
      phone: data.phone,
      firstname,
      lastname: lastname || "",
    };

    try {
      setLoading(true);
      const { user: updatedUser } = await updateUser(
        updatedData,
        account.user_id.toString(),
        token
      );
      setUser(updatedUser);
      setEditingField(null);
      originalValues.current = data;
      toast.success("Datos actualizados");
    } catch {
      toast.error("Error al actualizar datos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      const name = user.firstname + " " + user.lastname;
      const dni = user.dni.toString();
      const phone = user.phone;
      originalValues.current = { name, dni, phone };

      setValue("name", name);
      setValue("dni", dni);
      setValue("phone", phone);
    }
  }, [user, setValue]);

  useEffect(() => {
    if (editingField === "name") nameRef.current?.focus();
    if (editingField === "dni") dniRef.current?.focus();
    if (editingField === "phone") phoneRef.current?.focus();
  }, [editingField]);

  const isEditing = editingField !== null;

  return (
    <form className={s.datosPersonales} onSubmit={handleSubmit(onSubmit)}>
      <Text variant="h5" className={s.title}>
        Tus datos
      </Text>
      <span className={s.separator} />

      {/* EMAIL */}
      <div className={s.content}>
        <Text variant="md" className={s.subtitle}>
          Email
        </Text>
        <Text variant="md" className={`${s.value} ${s.disabled}`}>
          {user?.email || "-"}
        </Text>
      </div>
      <span className={s.separator} />

      {/* NOMBRE Y APELLIDO */}
      <div className={s.content}>
        <Text variant="md" className={s.subtitle}>
          Nombre y apellido
        </Text>
        <div className={s.valueCont}>
          <input
            type="text"
            {...register("name")}
            ref={(e) => {
              register("name").ref(e);
              nameRef.current = e;
            }}
            disabled={editingField !== "name"}
            className={`${s.value} ${
              editingField !== "name" ? s.disabled : ""
            }`}
          />
          <MdEdit
            role="button"
            className={s.edit}
            onClick={() => handleEdit("name")}
          />
          {errors.name && (
            <Text variant="xs" className={s.error}>
              {errors.name.message}
            </Text>
          )}
        </div>
      </div>
      <span className={s.separator} />

      {/* DNI */}
      <div className={s.content}>
        <Text variant="md" className={s.subtitle}>
          DNI
        </Text>
        <div className={s.valueCont}>
          <Text variant="md" className={`${s.value} ${s.disabled}`}>
            {user?.dni || "-"}
          </Text>
        </div>
      </div>
      <span className={s.separator} />

      {/* TELÉFONO */}
      <div className={s.content}>
        <Text variant="md" className={s.subtitle}>
          Teléfono
        </Text>
        <div className={s.valueCont}>
          <input
            type="text"
            {...register("phone")}
            ref={(e) => {
              register("phone").ref(e);
              phoneRef.current = e;
            }}
            disabled={editingField !== "phone"}
            className={`${s.value} ${
              editingField !== "phone" ? s.disabled : ""
            }`}
          />
          <MdEdit
            role="button"
            className={s.edit}
            onClick={() => handleEdit("phone")}
          />
          {errors.phone && (
            <Text variant="xs" className={s.error}>
              {errors.phone.message}
            </Text>
          )}
        </div>
      </div>
      <span className={s.separator} />

      {/* BOTÓN GUARDAR */}
      {isEditing && hasChanges && (
        <Button
          variant="primary"
          size="small"
          text="Guardar"
          type="submit"
          loading={loading}
        />
      )}
    </form>
  );
}
