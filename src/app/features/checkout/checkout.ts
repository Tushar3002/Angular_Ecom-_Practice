import { Component, inject } from '@angular/core';
import { CartService } from '../../core/services/cartServices/cart';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../core/services/authService/auth';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {

  // checkoutForm: FormGroup;
  loading = false;
  private router=inject(Router)
  private fb=inject(FormBuilder)
  checkoutForm = this.fb.group({
      useSaved: [false],
      address: ['', Validators.required],
      paymentMethod: ['COD', Validators.required],
    });
  constructor(
    // private fb: FormBuilder,
    public cartService: CartService,  
    public user:Auth
  ) {
    
    console.log(user.userData()?.address);
    
    this.checkoutForm.get('useSaved')?.valueChanges.subscribe((checked) => {
      const addressControl = this.checkoutForm.get('address');

      if (checked) {
        addressControl?.disable();
      } else {
        addressControl?.enable();
      }
    });

    if (this.cartService.cartItems().length === 0) {
      this.router.navigate(['/']);
    }
  }

  get total() {
    return this.cartService
      .cartItems()
      .reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  placeOrder() {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
      
    }
     this.cartService.clearCart();
    this.router.navigate(['success'])
    console.log({
      ...this.checkoutForm.getRawValue(),
      items: this.cartService.cartItems(),
      total: this.total,
    });
  }
}
