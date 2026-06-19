import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Cart } from './features/cart/cart';
import { Login } from './features/auth/login/login';
import { authGuard } from './core/guards/auth-guard';
import { PageNotFound } from './shared/page-not-found/page-not-found';
import { ProductDetails } from './features/product-details/product-details';
import { Register } from './features/auth/register/register';
import { publicGuard } from './core/guards/public-guard';
import { Checkout } from './features/checkout/checkout';
// import { Checkout } from './features/checkout/checkout';

export const routes: Routes = [
    {
        path:'login',
        component:Login,
        canActivate:[publicGuard]
    },
    {
        path:'register',
        component:Register,
        canActivate:[publicGuard]
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
        path:'checkout',
        component:Checkout,
        canActivate:[authGuard]
    },
    {
        path:'**',
        component:PageNotFound
    }
    
];
