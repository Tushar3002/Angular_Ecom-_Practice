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
    this.cartItems.update(items => {
       const existing = items.find(i => i.id === product.id);

    if(existing){
      return items.map(i =>
        i.id === product.id
          ? { ...i, quantity: (i.quantity ?? 1) + 1 }
          : i
      );
    }
    return [...items, { ...product, quantity: 1 }];

  })
    localStorage.setItem('cart', JSON.stringify(this.cartItems()));
  }

  decreaseCart(product: Product) {
  const item = this.cartItems().find(i => i.id === product.id);

  if (!item) return;

  if (item.quantity! > 1) {
    this.cartItems.update(items =>
      items.map(i =>
        i.id === product.id
          ? { ...i, quantity: i.quantity! - 1 }
          : i
      )
    );
  } else {
    this.removeFromCart(product.id);
  }

  localStorage.setItem('cart', JSON.stringify(this.cartItems()));
}

  removeFromCart(id: number) {
    this.cartItems.update((items) => items.filter((item) => item.id !== id));

    localStorage.setItem('cart', JSON.stringify(this.cartItems()));
  }

  clearCart() {
    this.cartItems.set([]);
     localStorage.removeItem('cart');
  }
  isInCart(productId: number): boolean {
    return this.cartItems().some((item) => item.id === productId);
  }
}
