import "../styles/globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LenisProvider } from "@/app/providers/LenisProvider";

export const metadata = {
  title: "DevLab — интерактивные лаборатории по IT",
  description: "Платформа для визуально-интерактивного обучения IT-технологиям.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className="bg-[#050509] text-slate-100 antialiased relative">

        {/* Фон‑сетка */}
        <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] z-0" />

        <LenisProvider>
          <Header />
          <main className="relative z-10">{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
