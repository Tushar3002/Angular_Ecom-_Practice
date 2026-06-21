import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../core/api/api-service';

@Component({
  selector: 'app-add-product',
  imports: [ReactiveFormsModule],
  templateUrl: './add-product.html',
})
export class AddProduct {
  private fb = inject(FormBuilder);

  selectedImage!: File;
  imagePreview: string | ArrayBuffer | null = null;

  loadingSubmit = false;

  constructor(
    private api: ApiService,
    private router: Router
  ) {}

  productForm = this.fb.group({
    name: ['', Validators.required],
    price: ['', [Validators.required, Validators.min(1)]],
    stock: ['', [Validators.required, Validators.min(0)]],
    description: ['', Validators.required],
    category: ['', Validators.required],
  });

  get name() {
    return this.productForm.get('name');
  }

  get price() {
    return this.productForm.get('price');
  }

  get stock() {
    return this.productForm.get('stock');
  }

  get description() {
    return this.productForm.get('description');
  }

  get category() {
    return this.productForm.get('category');
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];

      const reader = new FileReader();

      reader.onload = () => {
        this.imagePreview = reader.result;
      };

      reader.readAsDataURL(this.selectedImage);
    }
  }

  async onSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    try {
      this.loadingSubmit = true;

      const formData = new FormData();

      formData.append('name', this.productForm.value.name!);
      formData.append('price', this.productForm.value.price!.toString());
      formData.append(
        'description',
        this.productForm.value.description!
      );
      formData.append('stock', this.productForm.value.stock!.toString());
      formData.append('category', this.productForm.value.category!);

      if (this.selectedImage) {
        formData.append('image', this.selectedImage);
      }

      await this.api.request('POST', '/products', formData);

      this.productForm.reset();
      this.imagePreview = null;

      await this.router.navigate(['/']);
    } catch (error) {
      console.error(error);
    } finally {
      this.loadingSubmit = false;
    }
  }
}