import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../../core/api/api-service';
import { Product } from '../../../core/models/product';
import { CartService } from '../../../core/services/cartServices/cart';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-products',
  imports: [CommonModule, RouterLink],
  templateUrl: './category-products.html',
  styleUrl: './category-products.css',
})
export class CategoryProducts {
  private router = inject(ActivatedRoute);
  private api = inject(ApiService);
  cartService = inject(CartService);
  products = signal<Product[] | null>(null);

  categoryName=signal<string|null>('')
  ngOnInit() {
    const categoryName = this.router.snapshot.paramMap.get('categoryName');
    console.log(categoryName);
    this.getProductsByCategory(categoryName!);
  }

  async getProductsByCategory(categoryName: string | null) {
    const res = await this.api.request<Product[]>('GET', `/products/category/${categoryName}`);
    console.log(res.data);

    this.products.set(res.data);
    this.categoryName.set(categoryName)
  }

  addCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
