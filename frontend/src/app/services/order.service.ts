import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Order } from "./order"
import { Observable } from 'rxjs';

export type A = {

}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  static BASE_URL = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

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

  public async getOrders(): Promise<Order[] | undefined> {
    return (
      this.http.get(OrderService.BASE_URL+'/api/order') as Observable<Order[]>
    ).toPromise();
  }

  public async getOrder(id: number | undefined): Promise<Order | undefined> {
    return (
      this.http.get(OrderService.BASE_URL+`/api/order/${id}`) as Observable<Order>
    ).toPromise();
  }

  accepted(id: number): Promise<unknown> {
    const route = `/api/order/accept/${id}`;
    const body: A = {};
    return this.withPromiseWrap(
      this.http.post(OrderService.BASE_URL + route, body)
    );
  }

  cookingDone(id: number): Promise<unknown> {
    const route = `/api/order/cook/${id}`;
    const body: A = {};
    return this.withPromiseWrap(
      this.http.post(OrderService.BASE_URL + route, body)
    );
  }

  deliveryDone(id: number): Promise<unknown> {
    const route = `/api/order/deliver/${id}`;
    const body: A = {};
    return this.withPromiseWrap(
      this.http.post(OrderService.BASE_URL + route, body)
    );
  }

  async watchPizzas(id: number | undefined): Promise<number | undefined> {
    return id;
  }


}
