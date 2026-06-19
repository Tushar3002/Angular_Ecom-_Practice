import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from './features/home/home';
import { Header } from './shared/header/header';
import { Auth } from './core/services/authService/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Home,Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(private authService:Auth){}
  ngOnInit(){
    this.authService.loadUser();
  }
}
