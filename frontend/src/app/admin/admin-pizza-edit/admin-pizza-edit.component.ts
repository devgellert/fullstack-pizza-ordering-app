import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PizzaViewService } from '../../services/pizza-view.service';

@Component({
  selector: 'app-admin-pizza-edit',
  templateUrl: './admin-pizza-edit.component.html',
  styleUrls: ['./admin-pizza-edit.component.css'],
})
export class AdminPizzaEditComponent implements OnInit, OnDestroy {
  pizzaFormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    size: new FormControl(0, [Validators.required, Validators.min(0)]),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
  });

  constructor(private pizzaViewService: PizzaViewService) {}

  ngOnInit(): void {
    this.pizzaViewService.hydratePizza(1).then(() => {
      const pizza = this.pizzaViewService.getPizza();
      this.pizzaFormGroup.setValue({
        name: pizza?.name,
        size: pizza?.size,
        price: pizza?.price,
      });
    });
  }

  ngOnDestroy(): void {
    this.pizzaViewService.dehydratePizza();
  }

  isLoading() {
    return this.pizzaViewService.getPizza() === null;
  }

  onSubmit() {}
}
