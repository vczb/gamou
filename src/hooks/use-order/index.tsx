"use client";

import { createContext, useContext, useMemo, useState } from "react";

export type OrderProviderProps = {
  children: React.ReactNode;
};

export type OrderContextData = {
  customer: string;
  products: string[];
  saveProducts: (product: string[]) => void;
  cartNotes?: string;
  orderNotes?: string;
  paymentNotes?: string;
  saveCartNotes: (notes: string) => void;
  saveOrderNotes: (notes: string) => void;
  savePaymentNotes: (notes: string) => void;
  saveCustomerName: (notes: string) => void;
};

export const OrderContextDefaultValues = {
  customer: "",
  products: [],
  saveProducts: () => {},
  cartNotes: undefined,
  orderNotes: undefined,
  paymentNotes: undefined,
  saveCartNotes: () => {},
  saveOrderNotes: () => {},
  savePaymentNotes: () => {},
  saveCustomerName: () => {},
};

export const OrderContext = createContext<OrderContextData>(
  OrderContextDefaultValues
);

const OrderProvider = ({ children }: OrderProviderProps) => {
  const [customer, setCustomer] = useState("");
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
  const saveCustomerName = (name: string) => setCustomer(name);

  return (
    <OrderContext.Provider
      value={{
        customer,
        products,
        saveProducts,
        cartNotes,
        orderNotes,
        paymentNotes,
        saveCartNotes,
        saveOrderNotes,
        savePaymentNotes,
        saveCustomerName,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

const useOrder = () => useContext(OrderContext);

export { OrderProvider, useOrder };
