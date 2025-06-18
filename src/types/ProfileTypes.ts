import { editProfileSchema } from "@/schema/editProfileSchema";
import * as yup from "yup";
export type FormData = yup.InferType<typeof editProfileSchema>;
