import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {ApiPizza} from "../types/api";

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private pizzas: ApiPizza[] | null = null;

  private pizzaPictures: string[] = [
    'https://image-api.nosalty.hu/nosalty/images/recipes/3q/5Z/csiperkegombas-rukkolas-pizza.jpeg?w=640&h=480&fit=crop&s=f3c9386de15ba28413508e7cd57422ff',
    'https://amrestcdn.azureedge.net/ph-web-ordering/PH%20HU/Images/PH%20Product%20pictures_comp/2019_10_PH_mobilapp_kepek_olasz_500x500.jpg',
    'https://sawepecomcdn.blob.core.windows.net/ph-web-ordering/PH%20HU/Images/PH%20Product%20pictures_comp/2x_pizza_kedvezo_aron.jpg',
    'https://prod-wolt-venue-images-cdn.wolt.com/5e73a16da0e3ae1045814770/d3349148-b21f-11eb-a079-36af7faeaad6_menu_digopizza.jpg'
  ];

  constructor(private apiService: ApiService) {}

  hydratePizzas() {
    this.apiService.getPizzas().then(pizzas => {
      this.pizzas = pizzas || [];
    })
  }

  public getPizzas() {
    return this.pizzas;
  }

  public getRandomPizzaPicture() {
    const index = this.randomIntFromInterval(0,2);
    return this.pizzaPictures[index];
  }

  private randomIntFromInterval(min: number, max: number) { // min and max included
    return 0;
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
}
