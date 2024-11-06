/* eslint-disable @next/next/no-img-element */
"use client";

import { useCallback, useMemo } from "react";

import NumberField from "../NumberField";
import Trash from "../../icons/Trash";
import { ProductProps } from "../Product";
import { CURRENCY } from "@/utils/constants";
import { useCart } from "@/hooks/use-cart";
import { Product } from "@/types/product";

export type CartItemProps = {
  selectedVariants?: Product["variants"];
  amount: number;
} & ProductProps;

const CartItem = ({
  image,
  price,
  title,
  amount,
  description,
  selectedVariants,
  ...props
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
        amount,
        ...props,
      };

      if (newAmount > amount) {
        addToCart(product);
      } else {
        remFromCart(product);
      }
    },
    [image, price, title, amount, description, props, addToCart, remFromCart]
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
        amount,
        ...props,
      };

      removeAllFromCart(product);
    }
  }, [image, price, title, description, amount, props, removeAllFromCart]);

  const totalPrice = useMemo(() => {
    return (amount * price).toFixed(2);
  }, [amount, price]);

  const hiddenValue = useMemo(() => {
    const variantsText = selectedVariants
      ?.map(
        (variant) =>
          `${variant.title}: ${(variant.options || [])
            .map((option) => option.name)
            .join(", ")}`
      )
      .join(" \n   ∘ ");

    let text = `*${title}*`;

    if (variantsText) {
      text += `\n   ∘ ${variantsText}`;
    }

    text += `\nQuantidade: ${amount} \nPreço unitário: ${CURRENCY} ${price} \nPreço total: ${CURRENCY} ${totalPrice}.`;

    return text;
  }, [amount, price, title, totalPrice, selectedVariants]);

  return (
    <div className="grid grid-cols-[1fr_auto] gap-2 md:grid-cols-[1fr_1fr_1fr_3fr] md:gap-4 max-w-sm md:max-w-none">
      <img
        src={image}
        alt={title}
        className="hidden md:block md:row-start-1 md:row-end-3"
      />
      <div>
        <p className="font-bold text-medium md:text-large text-black">
          {title}
        </p>
        <div className="flex flex-col">
          {selectedVariants?.map((variant) => (
            <ol key={variant.title} className="text-xs">
              <span> {`${variant.title}:`} </span>

              {variant.options?.map((option) => (
                <li key={option.name} className="ml-2">
                  ∘ {option.name}
                </li>
              ))}
            </ol>
          ))}
        </div>
      </div>
      <p className="font-bold text-medium md:text-large text-primary-500 justify-self-end">
        {`${CURRENCY} ${totalPrice}`}
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
      <input type="hidden" name="product" value={hiddenValue} />
    </div>
  );
};

export default CartItem;
