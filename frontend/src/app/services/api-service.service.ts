import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  constructor(private http: HttpClient) { }

  public getPizzas() {
    const route = '/api/pizza/';
    const observable = this.http.get('http://localhost:5000' + route);
    observable.subscribe(value => {
      console.log(value);
    });
  }
}
