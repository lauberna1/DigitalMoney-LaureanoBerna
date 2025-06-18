import { User } from "@/types/globalTypes";
import { FullStepData } from "@/types/loginTypes";
import { RegisterFormData } from "@/types/registerTypes";
import { useCallback } from "react";

export function useAuthHook() {
  const registerUser = useCallback(async (formData: RegisterFormData) => {
    try {
      const res = await fetch(
        "https://digitalmoney.digitalhouse.com/api/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            dni: parseInt(formData.dni),
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
          }),
        }
      );

      if (!res.ok) throw new Error("Error al crear la cuenta");
      const data = await res.json();
      return data;
    } catch {
      throw new Error("Error al crear la cuenta");
    }
  }, []);

  const loginUser = useCallback(async (formData: FullStepData) => {
    try {
      const res = await fetch(
        "https://digitalmoney.digitalhouse.com/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      if (!res.ok) throw new Error("Error al iniciar sesión");
      const JWT = await res.json();
      return { JWT: JWT.token };
    } catch {
      throw new Error("Error al iniciar sesión");
    }
  }, []);

  const getUser = useCallback(
    async ({ token, userId }: { token: string; userId: number }) => {
      try {
        const res = await fetch(
          `https://digitalmoney.digitalhouse.com/api/users/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Error al obtener los datos del usuario");
        const user: User = await res.json();
        return { user };
      } catch {
        throw new Error("Error al obtener los datos del usuario");
      }
    },
    []
  );

  return { registerUser, loginUser, getUser };
}
