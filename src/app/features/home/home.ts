import { Component, signal } from '@angular/core';
import { Product, ProductPage } from '../../core/models/product';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../core/services/cartServices/cart';

import { firstValueFrom } from 'rxjs'; //
import { ApiService } from '../../core/api/api-service';
import { environment } from '../../../environment/environment';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterLink, NgClass],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  products = signal<Product[]>([]);

  currentPage = signal(1);
  totalPages = signal(1);
  totalProducts = signal(0);
  constructor(
    public cartService: CartService,
    private router: Router,
    private http: HttpClient,
    private api: ApiService,
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
  // async getProducts() {
  //   const data = await firstValueFrom(this.http.get<Product[]>(environment.apiUrl));
  //   console.log(data);
  //   this.products.set(data);
  // }
  async getProducts(page = 1) {
    try {
      const res = await this.api.request<ProductPage>(
        'GET',
        `/products?page=${page}&limit=8`,
        undefined,
        {
          showLoader: false,
          showToaster: false,
        },
      );

      console.log(res);

      this.products.set(res.data.products);

      this.currentPage.set(res.data.currentPage);
      this.totalPages.set(res.data.totalPages);
      this.totalProducts.set(res.data.totalProducts);
    } catch (error) {
      console.error('Failed to fetch products', error);
    }
  }

  addCart(product: Product) {
    this.cartService.addToCart(product);
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.getProducts(this.currentPage() + 1);
    }
  }

  previousPage() {
    if (this.currentPage() > 1) {
      this.getProducts(this.currentPage() - 1);
    }
  }
}
