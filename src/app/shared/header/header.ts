import { Component } from '@angular/core';
import { CartService } from '../../core/services/cartServices/cart';
import { RouterLink } from "@angular/router";
import { Auth } from '../../core/services/authService/auth';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  constructor(public cartService: CartService,public authService: Auth) {}
  
}
