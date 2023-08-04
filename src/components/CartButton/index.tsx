import { MouseEventHandler, useMemo } from "react";
import Cart from "../../icons/Cart";

export type CartButtonProps = {
  message: string;
  amount: number;
  price: number;
  currency?: string;
  variant?: "success" | "info" | "black";
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
};

const CartButton = ({
  amount,
  message,
  price,
  currency = "R$",
  variant = "black",
  onClick,
}: CartButtonProps) => {
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
    <button
      onClick={onClick}
      className={`flex justify-between items-center fixed bottom-0 left-0 right-0 w-full h-14 cursor-pointer px-3 duration-200 ${variantStyles}`}
    >
      <Cart className="w-6 lg:w-8 fill-current" />
      <p className="text-medium lg:text-large font-bold">{`${amount} ${message}`}</p>
      <p className="text-medium lg:text-large font-bold">{`${currency} ${price}`}</p>
    </button>
  );
};

export default CartButton;
