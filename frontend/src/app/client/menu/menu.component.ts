import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  constructor(
    private menuService: MenuService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.menuService.hydratePizzas();
  }

  getPizzas() {
    return this.menuService.getPizzas();
  }

  addToCart(pizzaId: number) {
    this.cartService.addPizzaId(pizzaId);
  }

  removeFromCart(pizzaId: number) {
    this.cartService.removePizzaId(pizzaId);
  }

  getAddToCartButtonText(pizzaId: number) {
    const isPizzaInCart = this.isPizzaInCart(pizzaId);

    if (!isPizzaInCart) {
      return 'Add To Cart';
    }

    const pizzaCount = this.cartService.getPizzaCountInCart(pizzaId);

    return `Add To Cart (x${pizzaCount})`;
  }

  isPizzaInCart(pizzaId: number) {
    return this.cartService.isPizzaInCart(pizzaId);
  }
}
