"use client";

import { useCart } from "@/hooks/use-cart";
import CartItem from "../CartItem";

const CartItemList = () => {
  const { items } = useCart();

  return (
    <div className="grid gap-0 lg:gap-4">
      {items.map((item) => (
        <div
          key={item.uid}
          className="border-dashed border-blueGray-200 p-4 border-b-2 "
        >
          <CartItem {...item} />
        </div>
      ))}
    </div>
  );
};

export default CartItemList;
