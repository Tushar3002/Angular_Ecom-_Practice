import { Component, inject, signal } from '@angular/core';
import { CartService } from '../../core/services/cartServices/cart';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../core/services/authService/auth';
import { ApiService } from '../../core/api/api-service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  // checkoutForm: FormGroup;
  loading=signal<boolean>(false)
  private router = inject(Router);
  private fb = inject(FormBuilder);
  checkoutForm = this.fb.group({
    useSaved: [false],
    address: ['', Validators.required],
    paymentMethod: ['COD', Validators.required],
  });
  shippingAddress=signal<string>('')
  constructor(
    // private fb: FormBuilder,
    public cartService: CartService,
    public user: Auth,
    public api: ApiService,
  ) {
    console.log(user.userData()?.address);

    this.checkoutForm.get('useSaved')?.valueChanges.subscribe((checked) => {
      const addressControl = this.checkoutForm.get('address');

      if (checked) {
        addressControl?.disable();
        this.shippingAddress.set(user.userData()?.address!)
      } else {
        addressControl?.enable();
        this.shippingAddress.set(this.checkoutForm.getRawValue().address!)
      }
    });

    if (this.cartService.cartItems().length === 0) {
      this.router.navigate(['/']);
    }
  }

  get total() {
    return this.cartService.cartItems().reduce((sum, item) => sum + item.price * item.quantity, 0);
  }



  async placeOrder() {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    try {
      this.loading.set(true)
      const items = this.cartService.cartItems().map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      }));
      const data = {
        shippingAddress: this.shippingAddress(),
        paymentMethod: this.checkoutForm.getRawValue().paymentMethod,
        items,
      };

      const res = await this.api.request('POST', '/orders', data);

      this.cartService.clearCart();
      this.router.navigate(['success'], {
        state: {
          orderId: res.data,
          total: this.total,
        },
      });
      console.log({
        ...this.checkoutForm.getRawValue(),
        items: this.cartService.cartItems(),
        total: this.total,
      });
    } catch (error) {
      console.error(error);
    }finally{
      this.loading.set(false)
    }
  }
}
