"use client";

import { useCart } from "@/hooks/use-cart";

const CartList = () => {
  const { items } = useCart();
  console.log("items", items);
  return (
    <section>
      <div>
        <a>Retornar para a loja</a>
      </div>
    </section>
  );
};

export default CartList;
