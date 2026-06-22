import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../../core/api/api-service';
import { Product } from '../../../core/models/product';

@Component({
  selector: 'app-products-list',
  imports: [RouterLink],
  templateUrl: './products-list.html',
  styleUrl: './products-list.css',
})
export class ProductsList {
  products = signal<Product[]>([]);
  loading = signal(true);

  constructor(
    private api: ApiService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.fetchProducts();
  }

  async fetchProducts() {
    try {
      const res = await this.api.request<Product[]>('GET', '/products',undefined,{showLoader:false,showToaster:false});

      if (res.status) {
        this.products.set(res.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.loading.set(false);
    }
  }

  editProduct(id: number) {
    this.router.navigate(['/admin/edit', id]);
  }

  async deleteProduct(id: number) {
    const confirmDelete = confirm('Are you sure you want to delete this product?');

    if (!confirmDelete) return;

    try {
      await this.api.request('DELETE', `/products/${id}`);

      this.products.update((products) => products.filter((product) => product.id !== id));
      
    } catch (error) {
      console.error(error);
    }
  }
}
