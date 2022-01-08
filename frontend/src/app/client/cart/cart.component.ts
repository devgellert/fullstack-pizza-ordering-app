import { Component, OnInit } from '@angular/core';
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  constructor(
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.cartService.hydratePizzas()
  }

  getTransformedData(): CartTransformedData[] {
    const res: CartTransformedData[] = [];

    this.cartService.getCartPizzaIds().forEach(id => {
      const elem = res.find(elem => elem.id === id);
      if(elem) {
        elem.count++;
      } else {
        const pizza = this.cartService.getPizzaById(id);
        const newElem: CartTransformedData = {
          id,
          name: pizza?.name as string,
          count: 1,
          price: pizza?.price as number
        }
        res.push(newElem);
      }
    })

    return res;
  }

  isEmpty() {
    return this.cartService.getCartPizzaIds().length === 0;
  }

  getFullPrice() {
    let res = 0;
    this.cartService.getCartPizzaIds().forEach(id => {
      res += this.cartService.getPizzaById(id)?.price || 0
    })
    return res;
  }
}

type CartTransformedData = {
  id: number;
  name: string;
  count: number;
  price: number;
  img?: string;
}
