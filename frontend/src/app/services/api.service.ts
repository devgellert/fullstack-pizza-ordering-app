import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GetPizzasResponse} from "../types/api";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  static BASE_URL = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  public async getPizzas(): Promise<GetPizzasResponse | null> {
    const route = '/api/pizza/';
    const observable = this.http.get(ApiService.BASE_URL + route);

    const response: Promise<GetPizzasResponse> = new Promise((resolve, reject) => {
      observable.subscribe({
        next: (value) => {
          resolve(value as GetPizzasResponse);
        }
      });
    });

    return await response;
  }
}
