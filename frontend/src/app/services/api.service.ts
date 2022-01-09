import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetPizzaResponse, GetPizzasResponse } from '../types/api';
import { Observable } from 'rxjs';

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
    return new Promise((resolve) => {
      observable.subscribe({
        next: (value) => {
          resolve(value as ResponseType);
        },
      });
    });
  }
}
