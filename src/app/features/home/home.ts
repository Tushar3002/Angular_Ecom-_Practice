import { Component, signal } from '@angular/core';
import { Product } from '../../core/models/product';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../core/services/cartServices/cart';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  products= signal<Product[]>([]);
  constructor(
    public cartService:CartService,
    private router: Router,
    private http: HttpClient,
  ) {}

  ngOnInit() {
    this.getProducts();
  }

  url = 'https://fakestoreapi.com/products';
  getProducts() {
    this.http.get<Product[]>(this.url).subscribe((data) => {
      this.products.set(data);
      console.log(data);
    });
  }
    addProduct(product: Product) {
  this.cartService.addToCart(product);
}
}
