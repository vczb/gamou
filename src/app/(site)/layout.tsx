import { CartProvider } from "@/hooks/use-cart";
import type { Metadata } from "next";
import { OrderProvider } from "@/hooks/use-order";

export const metadata: Metadata = {
  title: "GAMOU - Faça Seus Pedidos via WhatsApp em Segundos!",
  description: "Faça seu negócio crescer com Gamou",
};

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <OrderProvider>{children}</OrderProvider>
    </CartProvider>
  );
}
