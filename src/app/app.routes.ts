import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Cart } from './features/cart/cart';
import { Login } from './features/auth/login/login';
import { authGuard } from './core/guards/auth-guard';
import { PageNotFound } from './shared/page-not-found/page-not-found';
import { ProductDetails } from './features/product-details/product-details';

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
        path:'product/:id',
        component:ProductDetails
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
