import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Order } from "./order"
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  static BASE_URL = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  public async getOrders(): Promise<Order[] | undefined> {
    return (
      this.http.get(OrderService.BASE_URL+'/api/order') as Observable<Order[]>
    ).toPromise();

    const route = '/api/orders/';
    const observable = this.http.get(OrderService.BASE_URL + route);

    return new Promise((resolve, reject) => {
      observable.subscribe({
        next: (value) => {
          resolve(value as Order[]);
        }
      });
    });
  }
}
