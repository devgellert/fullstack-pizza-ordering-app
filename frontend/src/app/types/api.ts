import { PizzaForOrderCreation } from './order';

type WithTimeStamps = {
  created_at: string;
  updated_at: string;
};

export type ApiPizza = {
  id: number;
  name: string;
  price: number;
  size: number;
} & WithTimeStamps;

export type GetPizzasResponse = ApiPizza[];

export type GetPizzaResponse = ApiPizza;

export type PostOrderBody = {
  destination: string;
  customer_name: string;
  customer_phone: string;
  pizzas: PizzaForOrderCreation[];
};

export type PostOrderResponse = {
  status: ApiOrderStatus;
  destination: string;
  customer_name: string;
  customer_phone: string;
  //
  accepted_at?: string;
  accepted_by?: number;
  cooked_at?: string;
  cooked_by?: number;
  delivered_at?: string;
  delivered_by?: number;
};

export type ApiOrderStatus = 'ORDERED';
