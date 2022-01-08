type WithTimeStamps = {
  created_at: string;
  updated_at: string;
}

export type ApiPizza = {
  id: number;
  name: string;
  price: number;
  size: number;
} & WithTimeStamps;

export type GetPizzasResponse = ApiPizza[];

export type GetPizzaResponse = ApiPizza;

