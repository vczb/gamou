"use client";

import { CartItemProps } from "@/components/CartItem";
import { ProductProps } from "@/components/Product";
import { createContext, useContext, useMemo, useState } from "react";

export type CartProviderProps = {
  children: React.ReactNode;
};

type CartProductProps = {
  selectedVariants?: CartItemProps["selectedVariants"];
} & ProductProps;

export type CartContextData = {
  items: CartItemProps[];
  quantity: number;
  total: string | number;
  addToCart: (product: CartProductProps) => void;
  remFromCart: (product: ProductProps) => void;
  removeAllFromCart: (product: ProductProps) => void;
  loading: boolean;
};

export const CartContextDefaultValues = {
  items: [],
  quantity: 0,
  total: "$0.00",
  addToCart: () => null,
  remFromCart: () => null,
  removeAllFromCart: () => null,
  loading: false,
};

export const CartContext = createContext<CartContextData>(
  CartContextDefaultValues
);

const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItemProps[]>([]);

  const addToCart = (product: CartProductProps) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, amount: item.amount + 1 } : item
        );
      } else {
        return [...prev, { ...product, amount: 1 }];
      }
    });
  };

  const remFromCart = (product: ProductProps) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem && existingItem.amount > 1) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, amount: item.amount - 1 } : item
        );
      } else {
        return prev.filter((item) => item.id !== product.id);
      }
    });
  };

  const removeAllFromCart = (product: ProductProps) => {
    setCartItems((prev) => prev.filter((item) => item.id !== product.id));
  };

  const total = useMemo(
    () =>
      cartItems
        .reduce((acc, item) => acc + item.price * item.amount, 0)
        .toFixed(2),
    [cartItems]
  );

  const quantity = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.amount, 0),
    [cartItems]
  );

  return (
    <CartContext.Provider
      value={{
        items: cartItems,
        addToCart,
        remFromCart,
        removeAllFromCart,
        quantity,
        total,
        loading: false,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { CartProvider, useCart };
