import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../core/models/product';
import { CartService } from '../../core/services/cartServices/cart';
import { ApiService } from '../../core/services/api/api-service';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {
  products = signal<Product | null>(null);
  constructor(
    public route: ActivatedRoute,
    private http: HttpClient,
    public cartService:CartService,
    private api:ApiService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.getSingleProduct(id);
  }

  // getSingleProduct(id: string) {
  //   if (id) {
  //     this.http.get<Product>(`${this.url}/${id}`).subscribe((data) => {
  //       console.log(data);
  //       this.products.set(data);
  //       console.log(this.products);
  //     });
  //   }
  // }

  async getSingleProduct(id:string){
    // const data=await firstValueFrom(this.http.get<Product>(`${this.url}/${id}`))
    // this.products.set(data)

    const res=await this.api.request<Product>(
      'GET',
      `/products/${id}`,
    );

    this.products.set(res.data)
  }

  addProduct(product: Product) {
    if (!product) return;

    this.cartService.addToCart(product);
  }
}
