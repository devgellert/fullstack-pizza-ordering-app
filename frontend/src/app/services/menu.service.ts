import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {ApiPizza} from "../types/api";

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private pizzas: ApiPizza[] | null = null;

  constructor(private apiService: ApiService) {}

  hydratePizzas() {
    this.apiService.getPizzas().then(pizzas => {
      this.pizzas = pizzas || [];
    })
  }

  public getPizzas() {
    return this.pizzas;
  }
}
