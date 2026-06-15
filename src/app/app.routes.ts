import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Cart } from './features/cart/cart';
import { Login } from './features/auth/login/login';
import { authGuard } from './core/guards/auth-guard';
import { PageNotFound } from './shared/page-not-found/page-not-found';

export const routes: Routes = [
    {
        path:'login',
        component:Login
    },
    {
        path: '',
        component: Home,

    },
    {
        path:'cart',
        component:Cart,
        canActivate:[authGuard]
    },
    {
        path:'**',
        component:PageNotFound
    }
    
];
