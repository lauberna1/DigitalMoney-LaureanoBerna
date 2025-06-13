import * as yup from "yup";

export const registerSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("Nombre requerido")
    .min(3, "Mínimo 3 caracteres"),
  lastName: yup
    .string()
    .required("Apellido requerido")
    .min(3, "Mínimo 3 caracteres"),
  dni: yup
    .string()
    .required("DNI requerido")
    .matches(/^[0-9]{8}$/, "DNI invalido"),
  email: yup.string().required("Correo requerido").email("Correo inválido"),
  password: yup
    .string()
    .required("Contraseña requerida")
    .min(6, "Mínimo 6 caracteres")
    .max(20, "Máximo 20 caracteres")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Debe incluir un carácter especial")
    .matches(/[A-Z]/, "Debe incluir una mayúscula")
    .matches(/[0-9]/, "Debe incluir un número"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Las contraseñas no coinciden")
    .required("Confirmación requerida"),
  phone: yup
    .string()
    .required("Teléfono requerido")
    .matches(/^[0-9]+$/, "El teléfono solo debe contener números")
    .min(8, "El teléfono debe tener al menos 8 dígitos"),
});
