import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../core/api/api-service';

@Component({
  selector: 'app-products-list',
  imports: [],
  templateUrl: './products-list.html',
  styleUrl: './products-list.css',
})
export class ProductsList {
  products: any[] = [];

  constructor(
    private api: ApiService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.fetchProducts();
  }

  async fetchProducts() {
    try {
      const res = await this.api.request<any[]>(
        'GET',
        '/products'
      );

      if (res.status) {
        this.products = res.data;
      }

    } catch (error) {
      console.error(error);
    }
  }

  editProduct(id: string) {
    this.router.navigate(['/admin/edit', id]);
  }

  async deleteProduct(id: string) {

    const confirmDelete = confirm('Are you sure you want to delete this product?');

    if (!confirmDelete) return;

    try {

      await this.api.request(
        'DELETE',
        `/products/${id}`
      );

      this.products = this.products.filter(
        product => product.id !== id
      );

    } catch (error) {
      console.error(error);
    }
  }


}
