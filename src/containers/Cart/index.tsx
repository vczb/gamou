import CartButton from "@/components/CartButton";
import CartList from "@/components/CartList";

export default function Cart() {
  return (
    <main className="container">
      <CartList />
      <CartButton />
    </main>
  );
}
