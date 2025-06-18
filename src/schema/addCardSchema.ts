import * as yup from "yup";

export const addCardSchema = yup.object().shape({
  number: yup
    .string()
    .required("Número de tarjeta requerido")
    .matches(/^\d{16}$/, "El número de tarjeta debe tener 16 dígitos"),

  fullName: yup
    .string()
    .required("Nombre y apellido requerido")
    .matches(
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+ [A-Za-zÁÉÍÓÚáéíóúÑñ]+$/,
      "Debe ingresar un nombre y un apellido"
    ),

  expiration: yup
    .string()
    .required("Fecha de vencimiento requerida")
    .matches(/^(0?[1-9]|1[0-2])\/20\d{2}$/, "Formato inválido. Use MM/YYYY")
    .test("is-future-date", "La tarjeta está vencida", (value) => {
      if (!value) return false;
      const [monthStr, yearStr] = value.split("/");
      const month = parseInt(monthStr, 10);
      const year = parseInt(yearStr, 10);

      const today = new Date();
      const currentMonth = today.getMonth() + 1;
      const currentYear = today.getFullYear();

      return (
        year > currentYear || (year === currentYear && month >= currentMonth)
      );
    }),

  cvv: yup
    .string()
    .required("Código de seguridad requerido")
    .matches(/^\d{3,4}$/, "El código de seguridad debe tener 3 o 4 dígitos"),
});
