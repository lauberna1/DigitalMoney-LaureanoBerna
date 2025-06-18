import Sidebar from "./components/Sidebar/Sidebar";
import s from "./DashboardLayout.module.css";
import { DashboardProvider } from "@/context/DashboardContext/DashboardContext";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardProvider>
      <main className={s.container}>
        <Sidebar />
        <div className={s.content}>{children}</div>
      </main>
    </DashboardProvider>
  );
}
