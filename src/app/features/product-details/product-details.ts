import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../core/models/product';
import { CartService } from '../../core/services/cartServices/cart';
import { firstValueFrom } from 'rxjs';

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
  ) {}
  url = 'https://fakestoreapi.com/products';
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
    const data=await firstValueFrom(this.http.get<Product>(`${this.url}/${id}`))
    this.products.set(data)
  }

  addProduct(product: Product) {
    if (!product) return;

    this.cartService.addToCart(product);
  }
}
