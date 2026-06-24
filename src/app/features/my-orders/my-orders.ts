import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../../core/services/api/api-service';
import { Orders } from '../../core/models/orders';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-my-orders',
  imports: [CommonModule, RouterLink],
  templateUrl: './my-orders.html',
  styleUrl: './my-orders.css',
})
export class MyOrders {
  public api=inject(ApiService)
  orders=signal<Orders[] |null>(null)

  ngOnInit(){
    this.myOrders()
  }

  async myOrders(){
    const res=await this.api.request<Orders[]>('GET','/orders',undefined,{showToaster:false})
    console.log(res);
    
    this.orders.set(res.data)
  }
}
