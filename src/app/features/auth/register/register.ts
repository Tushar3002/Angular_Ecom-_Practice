import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../core/api/api-service';
import { authData, RegisterRequest } from '../../../core/models/authModel';

import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private fb=inject(FormBuilder)

  constructor(private api:ApiService,private router:Router){}
  RegisterForm=this.fb.group({
    name:['',[Validators.required,Validators.maxLength(20)]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(3),Validators.maxLength(6)]],
    phone:['',[Validators.required,Validators.pattern('^[0-9]{10}$')]],
    address:['',[Validators.required,Validators.minLength(10)]]
  })

  get name(){
    return this.RegisterForm.get('name')
  }

  get email() {
    return this.RegisterForm.get('email');
  }
  get password() {
    return this.RegisterForm.get('password');
  }

  get phone() {
    return this.RegisterForm.get('phone');
  }
  get address() {
    return this.RegisterForm.get('address');
  }

  async RegisterUser(){
    const {name, email, password,phone,address } = this.RegisterForm.value;
    const payload:RegisterRequest={
      name:name!,
      email:email!,
      password:password!,
      phone:phone!,
      address:address!
    }

    return await this.api.request<authData>('POST','/auth/register',payload)
  }

  async onSubmit(){
    if (this.RegisterForm.invalid) {
      this.RegisterForm.markAllAsTouched();
      return;
    }

    try {
      const res = await this.RegisterUser();

      if (res?.status && res.data) {
        // this.authService.login(res.data.token);
        await this.router.navigate(['/login']);
      }
    } catch (error) {
      console.error(error);
    }
  }
  
}
