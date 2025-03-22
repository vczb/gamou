import { CartItemProps } from "@/components/CartItem";

export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled';
export type PaymentMethod = 'credit_card' | 'debit_card' | 'cash' | 'pix' | 'other';

export interface Order {
  id: number;
  customer_name: string;
  customer_phone?: string;
  customer_email?: string;
  address?: string;
  items: CartItemProps[];
  total: number;
  payment_method?: PaymentMethod;
  order_notes?: string;
  cart_notes?: string;
  status: OrderStatus;
  company_id: number;
  created_at: Date;
  updated_at: Date;
}