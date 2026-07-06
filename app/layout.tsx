import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// Importamos tus componentes recién creados
import Sidebar from "@/src/components/layout/Sidebar/Sidebar";
import Navbar from "@/src/components/layout/Navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hey Hey | Tablero",
  description: "Panel de control operativo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      {/* Fondo oscuro */}
      <body suppressHydrationWarning className={`${inter.className} bg-[#0B0F19] text-white flex h-screen overflow-hidden`}>

        {/* Menú Lateral Fijo a la izquierda */}
        <Sidebar />

        {/* Contenedor Derecho */}
        <div className="flex-1 flex flex-col h-screen overflow-hidden">

          {/* Barra Superior Fija */}
          <Navbar />

          {/* Área Principal con Scroll (Aquí es donde se inyecta page.tsx) */}
          <main className="flex-1 overflow-y-auto p-8">
            <div className="max-w-full mx-auto space-y-8">
              {children}
            </div>
          </main>

        </div>
      </body>
    </html>
  );
}