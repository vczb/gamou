import { OrderStatus, PaymentMethod } from "@/types/order";
import packageJson from "../../package.json"

export const APP_VERSION  = packageJson?.version || ""
export const CURRENCY = "R$";
export const GAMOU_PHONE_NUMBER = "5551991901783";
export const TOKEN_SECRET = process.env.TOKEN_SECRET;
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const TOKEN_EXPIRATION_TIME = 86400; // 24 hours
export const STORAGE_KEY = `GAMOU_${APP_VERSION}`;
export const MEGABITE = 1000000 

//src/database/migrations/20250322000016_create_orders_table.js

export const ORDER_STATUS: Record<OrderStatus, string> = {
  pending: "Pendente",
  processing: "Em preparo",
  completed: "Completo",
  cancelled: "Cancelado",
}

export const DEFAULT_ORDER_STATUS = 'pending'

export const PAYMENT_METHOD: Record<PaymentMethod, string> = {
  credit_card: 'Cartão de Crédito',
  debit_card: 'Cartão de Débito',
  cash: 'Dinheiro',
  pix: 'PIX',
  other: 'Outro',
}