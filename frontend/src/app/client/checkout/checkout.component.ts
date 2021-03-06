import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CheckoutService } from '../../services/checkout.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  constructor(
    private checkoutService: CheckoutService,
    private cartService: CartService
  ) {}

  addressFormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),

    address: new FormGroup({
      postalCode: new FormControl('', Validators.required),
      country: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      lineOne: new FormControl('', [Validators.required]),
      lineTwo: new FormControl(''),
    }),

    payment: new FormGroup({
      cardNumber: new FormControl('', Validators.required),
      invalidationDate: new FormControl('', [Validators.required]),
      safetyCode: new FormControl('', [Validators.required]),
    }),
  });

  async submitForm() {
    if (this.addressFormGroup.invalid) {
      return;
    }

    await this.checkoutService.createOrder(this.addressFormGroup.getRawValue());

    this.cartService.dropCart();
  }

  getErrorMessages() {
    return this.checkoutService.errorMessages;
  }

  hasError() {
    return this.getErrorMessages().length > 0;
  }
}
