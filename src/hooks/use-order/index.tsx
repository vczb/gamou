'use client';

import { Order } from '@/types/order';
import { BASE_URL } from '@/utils/constants';
import renderFlashMessage from '@/utils/renderFlashMessage';
import { createContext, useContext, useMemo, useState } from 'react';

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
  createOrder: (order: Partial<Order>) => Promise<{ order: Order } | undefined>;
  editOrder: (
    order: Pick<Order, 'id' | 'status'>
  ) => Promise<{ order: Order } | undefined>;
};

export const OrderContextDefaultValues = {
  customer: '',
  products: [],
  saveProducts: () => {},
  cartNotes: undefined,
  orderNotes: undefined,
  paymentNotes: undefined,
  saveCartNotes: () => {},
  saveOrderNotes: () => {},
  savePaymentNotes: () => {},
  saveCustomerName: () => {},
  createOrder: () => {},
  editOrder: () => {},
} as unknown as OrderContextData;

export const OrderContext = createContext<OrderContextData>(
  OrderContextDefaultValues
);

const OrderProvider = ({ children }: OrderProviderProps) => {
  const [customer, setCustomer] = useState('');
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

  const createOrder = async (order: Partial<Order>) => {
    try {
      const orders_url = BASE_URL + '/api/orders';

      if (!BASE_URL) {
        throw new Error('variável BASE_URL não pode ser nula');
      }

      const response = await fetch(orders_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });

      const result = await response.json();

      if (response.status !== 200) {
        throw new Error(result?.message);
      }

      const newOrder = result?.data?.order;

      renderFlashMessage({ message: result.message, variant: 'success' });
      return {
        order: newOrder as Order,
      };
    } catch (error: any) {
      console.error(error);
      renderFlashMessage({ message: error.message, variant: 'alert' });
    }
  };

  const editOrder = async ({ id, status }: Pick<Order, 'id' | 'status'>) => {
    try {
      const orders_url = BASE_URL + '/api/orders/' + id;

      if (!BASE_URL) {
        throw new Error('variável BASE_URL não pode ser nula');
      }

      const response = await fetch(orders_url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status }),
      });

      const result = await response.json();

      console.log(result);

      if (response.status !== 200) {
        throw new Error(result?.message);
      }

      const newOrder = result?.data?.order;

      renderFlashMessage({ message: result.message, variant: 'success' });
      return {
        order: newOrder as Order,
      };
    } catch (error: any) {
      console.error(error);
      renderFlashMessage({ message: error.message, variant: 'alert' });
    }
  };

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
        createOrder,
        editOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

const useOrder = () => useContext(OrderContext);

export { OrderProvider, useOrder };
