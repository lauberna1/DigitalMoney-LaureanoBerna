import { Footer } from "@/components/footer/Footer";
import s from "./MainLayout.module.css";
import { Nav } from "@/components/Nav/Nav";
export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={s.mainLayout}>
      <Nav />
      {children}
      <Footer />
    </div>
  );
}
