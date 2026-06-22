import { Component, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-success-page',
  imports: [RouterLink],
  templateUrl: './success-page.html',
  styleUrl: './success-page.css',
})
export class SuccessPage {
  private router=inject(Router)
  
  continueShopping() {
    this.router.navigate(['/']);
  }
}
