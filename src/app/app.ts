import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from './features/home/home';
import { Header } from './layout/header/header';
import { Auth } from './core/services/authService/auth';
import { Loader } from './shared/loader/loader';
import { Footer } from './layout/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Header,Loader,Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(private authService:Auth){}
  ngOnInit(){
    this.authService.loadUser();
  }
}
