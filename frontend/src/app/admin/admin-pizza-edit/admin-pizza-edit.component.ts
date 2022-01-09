import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PizzaViewService } from '../../services/pizza-view.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

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

  id: number | null = null;

  isUpdateInProgress = false;

  paramSubscription: Subscription | null = null;

  constructor(
    private pizzaViewService: PizzaViewService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.paramSubscription = this.router.params.subscribe((params) => {
      this.id = (params as any).id;
      this.pizzaViewService.hydratePizza(this.id as number).then(() => {
        const pizza = this.pizzaViewService.getPizza();
        this.pizzaFormGroup.setValue({
          name: pizza?.name,
          size: pizza?.size,
          price: pizza?.price,
        });
      });
    });
  }

  ngOnDestroy(): void {
    if (this.paramSubscription !== null) {
      this.paramSubscription.unsubscribe();
    }

    this.pizzaViewService.dehydratePizza();
  }

  isLoading() {
    return this.isUpdateInProgress || this.pizzaViewService.getPizza() === null;
  }

  async onSubmit() {
    this.isUpdateInProgress = true;

    const formValue = this.pizzaFormGroup.getRawValue();

    await this.pizzaViewService.updatePizza({ id: this.id, ...formValue });

    this.isUpdateInProgress = false;
  }
}
