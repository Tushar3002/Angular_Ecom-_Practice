import { Injectable, signal } from '@angular/core';
import { CartService } from '../cartServices/cart';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  isLoggedIn = signal(!!localStorage.getItem('token'));

  constructor(private cartServices:CartService){}

  login(token: string) {
    localStorage.setItem('token', token);
    this.isLoggedIn.set(true);
  }

  logout() {
    localStorage.removeItem('token');
    this.cartServices.clearCart()
    this.isLoggedIn.set(false);
  }
}
