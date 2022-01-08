import { Component, OnInit } from '@angular/core';
import {MenuService} from "../../services/menu.service";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  constructor(
    private menuService: MenuService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.menuService.hydratePizzas();
    console.log(this.getPizzas())
  }

  getPizzas() {
    return this.menuService.getPizzas();
  }

  getPizzaImage() {
    return this.menuService.getRandomPizzaPicture();
  }

  addToCart(pizzaId: number) {
    this.cartService.addPizzaId(pizzaId);
  }

  isPizzaInCart(pizzaId: number) {
    return this.cartService.isPizzaInCart(pizzaId);
  }

  getPizzaCount(pizzaId: number) {
    return this.cartService.getPizzaCountInCart(pizzaId);
  }
}
