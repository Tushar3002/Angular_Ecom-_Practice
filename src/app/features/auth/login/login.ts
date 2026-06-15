import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../../core/services/authService/auth';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
})
export class Login {
  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService:Auth
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    const { email, password } = this.loginForm.value;

    const demoUser = {
      email: 'tj@gmail.com',
      password: '123456'
    };

    if (
      email === demoUser.email &&
      password === demoUser.password
    ) {
      this.authService.login('demo-jwt-token');
      localStorage.setItem('user', JSON.stringify({
        email: demoUser.email
      }));


      this.router.navigate(['/']);
    } else {
      this.errorMessage = 'Invalid Email or Password';
    }
  }
}