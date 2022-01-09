import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ApiPizza } from '../types/api';

@Injectable({
  providedIn: 'root',
})
// TODO: rename service to a more general name
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

  updatePizza(data: { id: number; name: string; size: number; price: number }) {
    return this.apiService.updatePizza(data);
  }
}
