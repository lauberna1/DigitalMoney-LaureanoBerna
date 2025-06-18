
import RegisterForm from "@/features/register/components/RegisterForm/RegisterForm";
import s from "./page.module.css";
export default function RegisterPage() {
  return (
    <section className={s.registerSection}>
      <RegisterForm />
    </section>
  );
}
