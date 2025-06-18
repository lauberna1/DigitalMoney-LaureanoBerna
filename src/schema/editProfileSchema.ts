import * as yup from "yup";
export const editProfileSchema = yup.object().shape({
  name: yup
    .string()
    .required("El nombre es obligatorio")
    .matches(
      /^[A-Za-zÁÉÍÓÚÑáéíóúñ]+ [A-Za-zÁÉÍÓÚÑáéíóúñ]+$/,
      "Debe ingresar nombre y apellido"
    ),
  dni: yup
    .string()
    .required("DNI requerido")
    .matches(/^[0-9]{8}$/, "DNI invalido"),
  phone: yup
    .string()
    .required("Teléfono requerido")
    .matches(/^[0-9]+$/, "El teléfono solo debe contener números")
    .min(8, "El teléfono debe tener al menos 8 dígitos"),
});
