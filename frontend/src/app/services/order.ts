
import { User } from "./user"
import { Pizza } from "./pizza"

export interface Order {
  id?: number,
  status: OrderStatus,
  destination: string,
  customer_name: string,
  customer_phone: string,
  accepted_at?: Date,
  cooked_at?: Date,
  delivered_at?: Date,
  accepted_by?: User,
  cooked_by?: User,
  delivered_by?: User,
  created_at?: Date,
  updated_at?: Date,
  pizzas: Pizza[]
}

export enum OrderStatus{
  Ordered = 'ORDERED',
  Accepted = 'ACCEPTED',
  Cooked = 'COOKED',
  Delivered = 'DELIVERED'
}
