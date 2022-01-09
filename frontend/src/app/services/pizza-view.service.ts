import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ApiPizza } from '../types/api';

@Injectable({
  providedIn: 'root',
})
export class PizzaViewService {
  private pizza: ApiPizza | null = null;

  constructor(private apiService: ApiService) {}

  async hydratePizza(pizzaId: number) {
    this.pizza = await this.apiService.getPizza(pizzaId);
  }

  public getPizza() {
    return this.pizza;
  }

  dehydratePizza() {
    this.pizza = null;
  }
}
