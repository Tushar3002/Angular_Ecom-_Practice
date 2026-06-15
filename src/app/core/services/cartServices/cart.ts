import { Injectable, signal } from '@angular/core';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems = signal<Product[]>([]);
  constructor() {
    const savedCart = localStorage.getItem('cart');

    if (savedCart) {
      this.cartItems.set(JSON.parse(savedCart));
    }
  }
  addToCart(product: Product) {
    this.cartItems.update((items) => [...items, product]);

    localStorage.setItem('cart', JSON.stringify(this.cartItems()));
  }

  removeFromCart(id: number) {
    this.cartItems.update((items) => items.filter((item) => item.id !== id));

    localStorage.setItem('cart', JSON.stringify(this.cartItems()));
  }

  clearCart() {
    this.cartItems.set([]);
  }
  isInCart(productId: number): boolean {
    return this.cartItems().some((item) => item.id === productId);
  }
}
