import { Footer } from "@/components/Footer/Footer";
import s from "./MainLayout.module.css";
import { Nav } from "@/components/Nav/components/Nav/Nav";
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
