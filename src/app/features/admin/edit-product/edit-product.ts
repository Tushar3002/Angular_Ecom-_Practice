import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../core/api/api-service';
import { Product } from '../../../core/models/product';
// import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-edit-product',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-product.html',
  styleUrl: './edit-product.css',
})
export class EditProduct {
  private fb=inject(FormBuilder)
  selectedImage: File | null = null;
  imagePreview = signal<string>('');

  submitting = signal(false);
  error = signal('');

  productForm = this.fb.group({
    name: ['', Validators.required],
    price: [0, Validators.required],
    description: [''],
    stock: [0, Validators.required],
    category: ['', Validators.required],
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api:ApiService
    // private productService: ProductService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.loadProduct(id);
    }
  }

  async loadProduct(id: string) {
    try {
      const res=await this.api.request<Product>(
      'GET',
      `/products/${id}`,
    );

      this.productForm.patchValue({
        name: res.data.name,
        price: res.data.price,
        description: res.data.description,
        stock: res.data.stock,
        category: res.data.category,
      });

      this.imagePreview.set(res.data.image);
    } catch {
      this.error.set('Failed to load product');
    } 
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) return;

    this.selectedImage = input.files[0];

    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview.set(reader.result as string);
    };

    reader.readAsDataURL(this.selectedImage);
  }

  async onSubmit() {
    if (this.productForm.invalid) return;

    const id = this.route.snapshot.paramMap.get('id');

    if (!id) return;

    try {
      this.submitting.set(true);

      const formData = new FormData();

      formData.append('name', this.productForm.value.name!);
      formData.append('price', String(this.productForm.value.price));
      formData.append(
        'description',
        this.productForm.value.description ?? ''
      );
      formData.append('stock', String(this.productForm.value.stock));
      formData.append(
        'category',
        this.productForm.value.category ?? ''
      );

      if (this.selectedImage) {
        formData.append('image', this.selectedImage);
      }
      await this.api.request<Product>(
      'PUT',
      `/products/${id}`,
      formData
    );

      this.router.navigate(['/admin/products-list']);
    } catch {
      this.error.set('Failed to update product');
    } finally {
      this.submitting.set(false);
    }
  }
}
