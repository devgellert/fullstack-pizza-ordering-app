import { Injectable } from '@angular/core';
import {ApiPizza} from "../types/api";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(
    private apiService: ApiService
  ) {}

  private pizzaIds: number[] = [];

  private pizzas: ApiPizza[] | null = null;

  addPizzaId(pizzaId: number) {
    this.pizzaIds.push(pizzaId);
  }

  removePizzaId(pizzaId: number) {
    this.pizzaIds = this.pizzaIds.filter(id => id !== pizzaId);
    console.log(this.pizzaIds);
  }

  isPizzaInCart(pizzaId: number) {
    return !!this.pizzaIds.find(id => id === pizzaId);
  }

  getPizzaCountInCart(pizzaId: number) {
    return this.pizzaIds.reduce((prev, curr )=> curr === pizzaId ? prev + 1 : prev, 0);
  }

  getCartPizzaIds() {
    return this.pizzaIds;
  }

  hydratePizzas() {
    this.apiService.getPizzas().then(pizzas => {
      this.pizzas = pizzas;
    });
  }

  getPizzaById(pizzaId: number) {
    return this.pizzas?.find(elem => elem.id === pizzaId);
  }


}


