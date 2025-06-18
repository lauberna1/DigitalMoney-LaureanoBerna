import { Footer } from "@/components/footer/Footer";
import s from "./MainLayout.module.css";
import { Nav } from "@/features/nav/components/Nav/Nav";
import { Bounce, ToastContainer } from "react-toastify";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={s.mainLayout}>
      <Nav />
      {children}
      <Footer />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        limit={3}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </div>
  );
}
