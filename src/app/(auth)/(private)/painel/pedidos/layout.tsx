import { CartProvider } from '@/hooks/use-cart';
import { OrderProvider } from '@/hooks/use-order';

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
