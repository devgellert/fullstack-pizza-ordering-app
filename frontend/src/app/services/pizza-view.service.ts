import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ApiPizza } from '../types/api';

@Injectable({
  providedIn: 'root',
})
// TODO: rename service to a more general name
export class PizzaViewService {
  private pizza: ApiPizza | null = null;

  ingredients: any[] | null = null;

  chosenIngredientIds: number[] = [];

  constructor(private apiService: ApiService) {}

  async hydratePizza(pizzaId: number) {
    this.pizza = await this.apiService.getPizza(pizzaId);
    this.chosenIngredientIds = this.pizza.ingredients.map(({ id }) => id);
  }

  async hydrateIngredients() {
    this.ingredients = (await this.apiService.getIngredients()) as any[];
  }

  public getPizza() {
    return this.pizza;
  }

  public getIngredients() {
    return this.ingredients;
  }

  dehydratePizza() {
    this.pizza = null;
  }

  dehydrateIngredients() {
    this.ingredients = null;
  }

  updatePizza(data: { id: number; name: string; size: number; price: number }) {
    return this.apiService.updatePizza({
      ...data,
      ingredient: this.chosenIngredientIds,
    });
  }

  getChosenIngredients() {
    return this.chosenIngredientIds;
  }

  toggleIngredient(ingredientId: number) {
    if (this.isInChosenIngredients(ingredientId)) {
      this.chosenIngredientIds = this.chosenIngredientIds.filter(
        (id) => id !== ingredientId
      );
    } else {
      this.chosenIngredientIds.push(ingredientId);
    }
  }

  isInChosenIngredients(ingredientId: number) {
    return this.chosenIngredientIds.find((id) => id === ingredientId);
  }
}
