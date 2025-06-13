import { LoginForm } from "@/features/login/components/LoginForm";
import s from "./page.module.css";
export default function RegisterPage() {
  return (
    <section className={s.loginSection}>
      <LoginForm />
    </section>
  );
}
