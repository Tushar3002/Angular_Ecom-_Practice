import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  imports: [],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category {

  categories = [
    {
      name: 'Toy',
      slug: 'toy',
      icon: 'bi-gift'
    },
    {
      name: 'Electronic',
      slug: 'electronic',
      icon: 'bi-laptop'
    },
    {
      name: 'Furniture',
      slug: 'furniture',
      icon: 'bi-house-door'
    },
    {
      name: 'Fashion',
      slug: 'fashion',
      icon: 'bi-bag'
    },
    {
      name: 'Watch',
      slug: 'watch',
      icon: 'bi-watch'
    }
  ];

  constructor(private router: Router) {}

  openCategory(category: string) {
    this.router.navigate(['/category', category]);
  }
}
