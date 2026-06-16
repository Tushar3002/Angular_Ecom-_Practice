import { Component, signal } from '@angular/core';
import { Product } from '../../core/models/product';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../core/services/cartServices/cart';

import { firstValueFrom } from 'rxjs'; //

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
  ) {}

  // ngOnInit() {
  //   this.getProducts();
  // }

  async ngOnInit() {
    await this.getProducts();
  }

  url = 'https://fakestoreapi.com/products';
  // getProducts() {
  //   this.http.get<Product[]>(this.url).subscribe((data) => {
  //     this.products.set(data);
  //     console.log(data);
  //   });
  // }
  async getProducts() {
    const data = await firstValueFrom(this.http.get<Product[]>(this.url));

    this.products.set(data);
  }

  addProduct(product: Product) {
    this.cartService.addToCart(product);
  }
}
