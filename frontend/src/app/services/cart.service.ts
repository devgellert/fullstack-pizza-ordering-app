import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private pizzaIds: number[] = [];

  addPizzaId(pizzaId: number) {
    this.pizzaIds.push(pizzaId);
    console.log(this.pizzaIds)
  }

  removePizzaId(pizzaId: number) {
    if(this.isPizzaInCart(pizzaId)) {
      this.pizzaIds = this.pizzaIds.filter(id => id !== pizzaId);
    }
    console.log(this.pizzaIds)
  }

  isPizzaInCart(pizzaId: number) {
    return this.pizzaIds.find(id => id === pizzaId) !== undefined;
  }

  getPizzaCountInCart(pizzaId: number) {
    return this.pizzaIds.reduce((prev, curr )=> curr === pizzaId ? prev + 1 : prev, 0);
  }

  removeAllPizzaIds() {
    this.pizzaIds = [];
    console.log(this.pizzaIds)
  }

  getCartPizzaIds() {
    return this.pizzaIds;
  }
}
