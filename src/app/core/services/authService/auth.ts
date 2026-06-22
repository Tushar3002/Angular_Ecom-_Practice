import { Injectable, signal } from '@angular/core';
import { CartService } from '../cartServices/cart';
import { Router } from '@angular/router';
import { ApiService } from '../../api/api-service';
import { User } from '../../models/authModel';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  isLoggedIn = signal(!!localStorage.getItem('token'));
//   role = signal('');
// userId = signal('');
  userData = signal<User | null>(null);
  constructor(private cartServices:CartService, private router:Router,private api:ApiService){}
  async loadUser() {
  const token = this.getToken();

  if (!token) return;

  try {
    // const user = await firstValueFrom(
    //   this.http.get<User>('/auth/me')
    // );

    const user=await this.api.request<User>('GET','/auth/me')
    this.userData.set(user.data);
    // this.role.set(user.data.role);
    // this.userId.set(user.data.id.toString());
    this.isLoggedIn.set(true);
  } catch {
    this.logout();
  }
}
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  login(token: string) {
    localStorage.setItem('token', token);
    this.isLoggedIn.set(true);
  }

  logout() {
    localStorage.removeItem('token');
    this.cartServices.clearCart()
    this.isLoggedIn.set(false);
    this.router.navigate(['/login'])
  }
}
