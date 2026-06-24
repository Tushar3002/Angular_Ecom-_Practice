
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '../services/authService/auth';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const auth=inject(Auth)
  const user=auth.userData()
  // const token = localStorage.getItem('token');


  if (user) {
    return true;
  }

  // router.navigate(['/login']);
  // return false;  
  return router.createUrlTree(['/login']);
};