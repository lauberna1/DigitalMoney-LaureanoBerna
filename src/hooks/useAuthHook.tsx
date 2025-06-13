import { FullStepData } from "@/features/login/types/types";
import { RegisterFormData } from "@/features/register/types/types";

export function useAuthHook() {
  const registerUser = async (formData: RegisterFormData) => {
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

      if (!res.ok) {
        throw new Error("Error al crear la cuenta");
      }

      console.log(res);

      const data = await res.json();
      console.log(data);
      return data;
    } catch {
      throw new Error("Error al crear la cuenta");
    }
  };

  const loginUser = async (formData: FullStepData) => {
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

      if (!res.ok) {
        throw new Error("Error al crear la cuenta");
      }

      const JWT = await res.json();

      return { JWT: JWT.token };
    } catch {
      throw new Error("Error al crear la cuenta");
    }
  };

  return { registerUser, loginUser };
}
