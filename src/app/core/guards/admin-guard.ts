import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/authService/auth';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const auth=inject(Auth)
  const router = inject(Router);
  const user = auth.userData();

  if (!user) {
    return router.createUrlTree(['/login']);
  }
  if (user.role === 'admin') {
    return true;
  }

  return router.createUrlTree(['/']);
};
