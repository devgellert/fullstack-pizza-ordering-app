import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {ApiPizza} from "../types/api";

@Injectable({
  providedIn: 'root'
})
export class PizzaViewService {

  private pizza: ApiPizza | null = null;

  constructor(private apiService: ApiService) { }

  hydratePizza (pizzaId: number) {
    this.apiService.getPizza(pizzaId).then(pizza => {
      this.pizza = pizza;
    });
  }

  public getPizza() {
    return this.pizza;
  }
}
