import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {PizzaViewService} from "../../services/pizza-view.service";

@Component({
  selector: 'app-pizza-view',
  templateUrl: './pizza-view.component.html',
  styleUrls: ['./pizza-view.component.css']
})
export class PizzaViewComponent implements OnInit {
  constructor(private route: ActivatedRoute, private pizzaViewService: PizzaViewService) { }

  ngOnInit(): void {
    this.route.params.subscribe((value) => {
      const id: number = (value as any).id;

      this.pizzaViewService.hydratePizza(id);
    })
  }

  public getPizza() {
    return this.pizzaViewService.getPizza();
  }
}
