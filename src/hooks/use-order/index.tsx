"use client";

import { createContext, useContext, useMemo, useState } from "react";

export type OrderProviderProps = {
  children: React.ReactNode;
};

export type OrderContextData = {
  products: string[];
  saveProducts: (product: string[]) => void;
  cartNotes?: string;
  orderNotes?: string;
  paymentNotes?: string;
  saveCartNotes: (notes: string) => void;
  saveOrderNotes: (notes: string) => void;
  savePaymentNotes: (notes: string) => void;
};

export const OrderContextDefaultValues = {
  products: [],
  saveProducts: () => {},
  cartNotes: undefined,
  orderNotes: undefined,
  paymentNotes: undefined,
  saveCartNotes: () => {},
  saveOrderNotes: () => {},
  savePaymentNotes: () => {},
};

export const OrderContext = createContext<OrderContextData>(
  OrderContextDefaultValues
);

const OrderProvider = ({ children }: OrderProviderProps) => {
  const [products, setProducts] = useState<string[]>([]);
  const [cartNotes, setCartNotes] = useState<string>();
  const [orderNotes, setOrderNotes] = useState<string>();
  const [paymentNotes, setPaymentNotes] = useState<string>();

  const saveProducts = (products: string[]) => {
    setProducts(products);
  };

  const saveCartNotes = (notes: string) => setCartNotes(notes);
  const saveOrderNotes = (notes: string) => setOrderNotes(notes);
  const savePaymentNotes = (notes: string) => setPaymentNotes(notes);

  return (
    <OrderContext.Provider
      value={{
        products,
        saveProducts,
        cartNotes,
        orderNotes,
        paymentNotes,
        saveCartNotes,
        saveOrderNotes,
        savePaymentNotes,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

const useOrder = () => useContext(OrderContext);

export { OrderProvider, useOrder };
