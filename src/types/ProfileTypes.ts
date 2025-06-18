import { EditProfileSchema } from "@/schema/EditProfileSchema";
import * as yup from "yup";
export type FormData = yup.InferType<typeof EditProfileSchema>;
