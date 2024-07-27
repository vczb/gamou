"use client";

import { CartItemProps } from "@/components/CartItem";
import { ProductProps } from "@/components/Product";
import { createContext, useContext, useMemo, useState } from "react";

export type CartProviderProps = {
  children: React.ReactNode;
};

export type CartContextData = {
  items: CartItemProps[];
  quantity: number;
  total: string | number;
  addToCart: (product: ProductProps) => void;
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

  const addToCart = (product: ProductProps) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.uid === product.uid);
      if (existingItem) {
        return prev.map((item) =>
          item.uid === product.uid ? { ...item, amount: item.amount + 1 } : item
        );
      } else {
        return [...prev, { ...product, amount: 1 }];
      }
    });
  };

  const remFromCart = (product: ProductProps) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.uid === product.uid);
      if (existingItem && existingItem.amount > 1) {
        return prev.map((item) =>
          item.uid === product.uid ? { ...item, amount: item.amount - 1 } : item
        );
      } else {
        return prev.filter((item) => item.uid !== product.uid);
      }
    });
  };

  const removeAllFromCart = (product: ProductProps) => {
    setCartItems((prev) => prev.filter((item) => item.uid !== product.uid));
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
