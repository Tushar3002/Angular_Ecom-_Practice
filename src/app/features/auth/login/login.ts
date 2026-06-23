import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../../core/services/authService/auth';
import { ApiService } from '../../../core/api/api-service';
import { authData, LoginRequest } from '../../../core/models/authModel';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
})
export class Login {
  // loginForm: FormGroup;


  private fb = inject(FormBuilder);

  constructor(
    // private fb: FormBuilder,
    private router: Router,
    private authService: Auth,
    private api: ApiService,
  ) {}
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  get password() {
    return this.loginForm.get('password');
  }

  get email() {
    return this.loginForm.get('email');
  }

  async loginUser() {
    const { email, password } = this.loginForm.value;
    const payload: LoginRequest = {
      email: email!,
      password: password!,
    };
    return await this.api.request<authData>('POST', '/auth/login', payload);
  }

  async onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    try {
      const res = await this.loginUser();
      console.log(res);
      
      if (res?.status && res.data) {
        this.authService.login(res.data.token);
        this.authService.userData.set(res.data.user)
        console.log(res.data.user.role);
        
        await this.router.navigate(['/']);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
