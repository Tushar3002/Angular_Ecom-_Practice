import { Component } from '@angular/core';
import { CartService } from '../../core/services/cartServices/cart';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  checkoutForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    public cartService: CartService
  ) {
    this.checkoutForm = this.fb.group({
      useSaved: [false],
      address: ['', Validators.required],
      paymentMethod: ['COD', Validators.required],
    });

    this.checkoutForm.get('useSaved')?.valueChanges.subscribe((checked) => {
      const addressControl = this.checkoutForm.get('address');

      if (checked) {
        addressControl?.disable();
      } else {
        addressControl?.enable();
      }
    });
  }

  get total() {
    return this.cartService
      .cartItems()
      .reduce((sum, item) => sum + item.price * item.quantity!, 0);
  }

  placeOrder() {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    console.log({
      ...this.checkoutForm.getRawValue(),
      items: this.cartService.cartItems(),
      total: this.total,
    });
  }
}
