import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { CreateOrderInputData, PizzaForOrderCreation } from '../types/order';
import { CartService } from './cart.service';
import { HttpErrorResponse } from '@angular/common/http';
import { countBy, forEach, uniq } from 'lodash';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  errorMessages: string[] = [];

  constructor(
    private apiService: ApiService,
    private cartService: CartService,
    private router: Router
  ) {}

  async createOrder(inputData: CreateOrderInputData) {
    const { city, postalCode, lineTwo, lineOne } = inputData.address;

    const address = `${postalCode}, ${city}, ${lineOne}${
      lineTwo ? `, ${lineTwo}` : ''
    }`;

    try {
      console.log({
        address,
        phone: inputData.phone,
        name: inputData.name,
        pizzas: this.getAndTransformPizzasForOrderCreation(),
      });
      const order = await this.apiService.postOrder({
        address,
        phone: inputData.phone,
        name: inputData.name,
        pizzas: this.getAndTransformPizzasForOrderCreation(),
      });

      await this.router.navigate(['/order', order.id]);
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
    const uniqueIds = uniq(pizzaIds);

    const result: PizzaForOrderCreation[] = [];

    uniqueIds.forEach((id) => {
      let count = 0;

      forEach(pizzaIds, (id2) => {
        if (id2 === id) {
          count++;
        }
      });

      result.push({ id, piece: count });
    });

    return result;
  }
}
