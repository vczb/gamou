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
  loading: boolean;
};

export const CartContextDefaultValues = {
  items: [],
  quantity: 0,
  total: "$0.00",
  addToCart: () => null,
  remFromCart: () => null,
  loading: false,
};

export const CartContext = createContext<CartContextData>(
  CartContextDefaultValues
);

const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<ProductProps[]>([]);

  const addToCart = (product: ProductProps) => {
    setCartItems((prev) => [...prev, product]);
  };

  const remFromCart = (product: ProductProps) => {
    setCartItems((prev) => prev.filter((prod) => prod.uid !== product.uid));
  };

  const total = useMemo(
    () =>
      cartItems
        .reduce((val, acc) => {
          return (val += acc.price);
        }, 0)
        .toFixed(2),
    [cartItems]
  );

  return (
    <CartContext.Provider
      value={{
        items: cartItems,
        addToCart: addToCart,
        remFromCart,
        quantity: cartItems.length,
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
