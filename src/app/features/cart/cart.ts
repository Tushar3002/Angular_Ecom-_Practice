import { Component, computed, signal } from '@angular/core';
import { CartService } from '../../core/services/cartServices/cart';
import { RouterLink } from "@angular/router";
import { Product } from '../../core/models/product';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  constructor(public cartService: CartService) {
    console.log(cartService.cartItems());
  }
cartItems = signal<Product[]>([]);

  total = computed(() =>
    this.cartItems().reduce(
      (sum, item) => sum + item.price * (item.quantity ?? 1),
      0
    )
  );

  totalItems = computed(() =>
    this.cartItems().reduce(
      (sum, item) => sum + (item.quantity ?? 1),
      0
    )
  );
}
