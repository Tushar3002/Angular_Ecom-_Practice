import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../../core/services/api/api-service';
import { Product, ProductPage } from '../../../core/models/product';

@Component({
  selector: 'app-products-list',
  imports: [RouterLink],
  templateUrl: './products-list.html',
  styleUrl: './products-list.css',
})
export class ProductsList {
  products = signal<Product[]>([]);
  loading = signal(true);
  currentPage = signal(1);
  totalPages = signal(1);
  totalProducts = signal(0);
  
  constructor(
    private api: ApiService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.fetchProducts();
  }

  async fetchProducts(page=1) {
    try {
      const res = await this.api.request<ProductPage>('GET', `/products?page=${page}&limit=10`,undefined,{showLoader:false,showToaster:false});

      if (res.status) {
        this.products.set(res.data.products);
      }
      this.currentPage.set(res.data.currentPage);
      this.totalPages.set(res.data.totalPages);
      this.totalProducts.set(res.data.totalProducts);
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
  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.fetchProducts(this.currentPage() + 1);
    }
  }

  previousPage() {
    if (this.currentPage() > 1) {
      this.fetchProducts(this.currentPage() - 1);
    }
  }
}
