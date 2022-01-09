import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { CreateOrderInputData, PizzaForOrderCreation } from '../types/order';
import { CartService } from './cart.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  errorMessages: string[] = [];

  constructor(
    private apiService: ApiService,
    private cartService: CartService
  ) {}

  async createOrder(inputData: CreateOrderInputData) {
    const { city, postalCode, lineTwo, lineOne } = inputData.address;

    const address = `${postalCode}, ${city}, ${lineOne}${
      lineTwo ? `, ${lineTwo}` : ''
    }`;

    try {
      const order = await this.apiService.postOrder({
        address,
        phone: inputData.phone,
        name: inputData.name,
        pizzas: this.getAndTransformPizzasForOrderCreation(),
      });
      console.log('order', order);
    } catch (response) {
      this.errorMessages = this.apiService.getErrorMessagesFromResponse(
        response as HttpErrorResponse
      );
      setTimeout(() => {
        this.errorMessages = [];
      }, 5000);
    }
  }

  private getAndTransformPizzasForOrderCreation() {
    const pizzaIds = this.cartService.getCartPizzaIds();
    const result: PizzaForOrderCreation[] = [];
    pizzaIds.forEach((id) => {
      const elem = result.find((elem) => elem.id === id);
      if (elem) {
        elem.piece += 1;
      }
    });
    return result;
  }
}
