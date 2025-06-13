import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().required("Correo requerido").email("Correo inválido"),
  password: yup.string().required("Contraseña requerida"),
});
