/* eslint-disable @next/next/no-img-element */
"use client";

import { useCallback, useMemo } from "react";

import NumberField from "../NumberField";
import Trash from "../../icons/Trash";
import { ProductProps } from "../Product";
import { CURRENCY } from "@/utils/constants";
import { useCart } from "@/hooks/use-cart";

export type CartItemProps = { amount: number } & ProductProps;

const CartItem = ({
  image,
  price,
  title,
  amount,
  description,
  uid,
}: CartItemProps) => {
  const { addToCart, remFromCart, removeAllFromCart } = useCart();

  const disabledMinusBtn = useMemo(() => {
    return amount <= 1;
  }, [amount]);

  const handleAddOrRemoveItem = useCallback(
    (newAmount: number) => {
      const product = {
        image,
        price,
        title,
        description,
        uid,
      };

      if (newAmount > amount) {
        addToCart(product);
      } else {
        remFromCart(product);
      }
    },
    [image, price, title, amount, description, uid, addToCart, remFromCart]
  );

  const handleRemoveAllitems = useCallback(() => {
    if (
      window.confirm(`Você tem certeza que quer remover ${amount} unidade(s) ?`)
    ) {
      const product = {
        image,
        price,
        title,
        description,
        uid,
      };

      removeAllFromCart(product);
    }
  }, [image, price, title, description, uid, amount, removeAllFromCart]);

  return (
    <div className="grid grid-cols-[1fr_auto] gap-2 md:grid-cols-[1fr_1fr_1fr_3fr] md:gap-4 max-w-sm md:max-w-none">
      <img
        src={image}
        alt={title}
        className="hidden md:block md:row-start-1 md:row-end-3"
      />
      <p className="font-bold text-medium md:text-large text-black">{title}</p>
      <p className="font-bold text-medium md:text-large text-primary-500 justify-self-end">
        {`${CURRENCY} ${price}`}
      </p>
      <div className="flex items-center">
        <NumberField
          defaultValue={amount}
          onChange={handleAddOrRemoveItem}
          minusDisabled={disabledMinusBtn}
        />
        <i className="text-blueGray-600 ml-2 text-small">Unidade(s)</i>
      </div>
      <button
        className="w-4 h-4 self-center justify-self-end"
        onClick={handleRemoveAllitems}
      >
        <Trash className="text-blueGray-500 hover:text-blueGray-800 fill-current duration-200" />
      </button>
      <div className="hidden md:block md:row-start-1 md:row-end-3 md:col-start-4 ml-4 pl-4 border-solid border-l-2">
        <p>{description}</p>
      </div>
    </div>
  );
};

export default CartItem;
