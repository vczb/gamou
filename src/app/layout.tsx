import { CartProvider } from "@/hooks/use-cart";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { OrderProvider } from "@/hooks/use-order";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GAMOU - Faça Seus Pedidos via WhatsApp em Segundos!",
  description: "Faça seu negócio crescer com Gamou",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head></head>
      <body className={`${inter.className}`}>
        {
          <CartProvider>
            <OrderProvider>{children}</OrderProvider>
          </CartProvider>
        }
      </body>
    </html>
  );
}
