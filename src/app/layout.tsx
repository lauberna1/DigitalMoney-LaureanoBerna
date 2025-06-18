import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { MainLayout } from "@/layouts/MainLayout/MainLayout";
import { AuthProvider } from "@/context/AuthContext/AuthContext";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Digital Money Bank",
  description: "todo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${openSans.variable}`}>
        <AuthProvider>
          <MainLayout>{children}</MainLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
