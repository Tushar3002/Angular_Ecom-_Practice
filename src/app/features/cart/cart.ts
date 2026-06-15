import { Component } from '@angular/core';
import { CartService } from '../../core/services/cartServices/cart';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  constructor(public cartService: CartService) {
    console.log(cartService.cartItems());
  }

}
