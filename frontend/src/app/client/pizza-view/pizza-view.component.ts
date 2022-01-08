import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PizzaViewService } from '../../services/pizza-view.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-pizza-view',
  templateUrl: './pizza-view.component.html',
  styleUrls: ['./pizza-view.component.css'],
})
export class PizzaViewComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private pizzaViewService: PizzaViewService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((value) => {
      const id: number = (value as any).id;

      this.pizzaViewService.hydratePizza(id);
    });
  }

  public getPizza() {
    return this.pizzaViewService.getPizza();
  }

  addToCart() {
    this.cartService.addPizzaId(this.getPizza()?.id as number);
  }

  isPizzaInCart() {
    return this.cartService.isPizzaInCart(this.getPizza()?.id as number);
  }

  getPizzaCountInCart() {
    return this.cartService.getPizzaCountInCart(this.getPizza()?.id as number);
  }
}
