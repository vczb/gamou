"use client";

import { useMemo } from "react";
import Cart from "../../icons/Cart";
import { useCart } from "@/hooks/use-cart";
import { CURRENCY } from "@/utils/constants";
import { useParams } from "next/navigation";
import Link from "@/components/Link";

export type CartButtonProps = {
  variant?: "success" | "info" | "black";
};

const CartButton = ({ variant = "black" }: CartButtonProps) => {
  const { slug } = useParams();

  const { quantity, total } = useCart();

  const path = useMemo(() => `/${slug}/carrinho`, [slug]);

  const quantityMessage: string = useMemo(() => {
    if (quantity > 1) {
      return "Items";
    }
    return "Item";
  }, [quantity]);

  const isHidden = useMemo(() => quantity === 0, [quantity]);

  const variantStyles = useMemo(() => {
    switch (variant) {
      case "success":
        return "bg-success text-white hover:text-black";
      case "info":
        return "bg-info text-white hover:text-black";
      case "black":
      default:
        return "bg-black text-white hover:text-primary-500";
    }
  }, [variant]);

  return (
    <Link
      className={`flex justify-between items-center fixed bottom-0 left-0 right-0 w-full h-14 cursor-pointer px-3 duration-200 ${variantStyles} 
        ${isHidden ? "hidden" : ""}`}
      href={path}
    >
      <Cart className="w-6 lg:w-8 fill-current" />
      <p className="text-medium lg:text-large font-bold">{`${quantity} ${quantityMessage}`}</p>
      <p className="text-medium lg:text-large font-bold">{`${CURRENCY} ${total}`}</p>
    </Link>
  );
};

export default CartButton;
