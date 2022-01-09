import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  GetPizzaResponse,
  GetPizzasResponse,
  PostOrderBody,
} from '../types/api';
import { Observable } from 'rxjs';
import { PostOrderData } from '../types/order';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  static BASE_URL = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  public async getPizzas(): Promise<GetPizzasResponse | null> {
    const route = '/api/pizza/';
    const observable = this.http.get(ApiService.BASE_URL + route);

    return this.withPromiseWrap<GetPizzasResponse>(observable);
  }

  getPizza(pizzaId: number): Promise<GetPizzaResponse> {
    const route = `/api/pizza/${pizzaId}`;

    const observable = this.http.get(ApiService.BASE_URL + route);

    return this.withPromiseWrap(observable);
  }

  private withPromiseWrap<ResponseType extends any>(
    observable: Observable<any>
  ): Promise<ResponseType> {
    return new Promise((resolve, reject) => {
      observable.subscribe({
        next: (value) => {
          resolve(value as ResponseType);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  postOrder(data: PostOrderData) {
    const route = '/api/order/create';
    const body: PostOrderBody = {
      destination: data.address,
      customer_name: data.name,
      customer_phone: data.phone,
      pizzas: [],
    };
    return this.withPromiseWrap(
      this.http.post(ApiService.BASE_URL + route, body)
    );
  }

  getErrorMessagesFromResponse(response: HttpErrorResponse): string[] {
    const errors: { [key in string]: string }[] = response.error.errors ?? {};
    const errorMessages: string[] = [];
    Object.values(errors).forEach((e) => errorMessages.push(e[0]));
    return errorMessages;
  }
}
