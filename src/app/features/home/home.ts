import { Component, signal } from '@angular/core';
import { Product } from '../../core/models/product';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../core/services/cartServices/cart';

import { firstValueFrom } from 'rxjs'; //
import { ApiService } from '../../core/api/api-service';
import { environment } from '../../../environment/environment';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  products = signal<Product[]>([]);
  constructor(
    public cartService: CartService,
    private router: Router,
    private http: HttpClient,
    private api:ApiService
  ) {}

  // ngOnInit() {
  //   this.getProducts();
  // }

  async ngOnInit() {
    await this.getProducts();
  }


  // getProducts() {
  //   this.http.get<Product[]>(this.url).subscribe((data) => {
  //     this.products.set(data);
  //     console.log(data);
  //   });
  // }
  async getProducts() {
    const data = await firstValueFrom(this.http.get<Product[]>(environment.apiUrl));
    console.log(data);
    this.products.set(data);
  }
  // async getProducts() {
  //   const res = await this.api.request<Product[]>(
  //      'GET',
  //      'this.url'
  // );
  //   console.log(data);
    
  //   this.products.set(data);
  // }

  addCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
