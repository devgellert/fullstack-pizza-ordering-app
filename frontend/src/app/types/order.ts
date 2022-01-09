export type CreateOrderInputData = {
  name: string;
  phone: string;
  address: {
    city: string;
    postalCode: string;
    lineOne: string;
    lineTwo?: string;
  };
  payment: {
    cardNumber: string;
    safetyCode: string;
    invalidationDate: string;
  };
};

export type PostOrderData = {
  address: string;
  name: string;
  phone: string;
  pizzas: PizzaForOrderCreation[];
};

export type PizzaForOrderCreation = {
  id: number;
  piece: number;
};
