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
import { ProductsList } from './features/admin/products-list/products-list';
import { AddProduct } from './features/admin/add-product/add-product';
import { SuccessPage } from './features/success-page/success-page';
// import { Checkout } from './features/checkout/checkout';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
    canActivate: [publicGuard],
  },
  {
    path: 'register',
    component: Register,
    canActivate: [publicGuard],
  },
  {
    path: '',
    component: Home,
  },
  {
    path: 'product/:id',
    component: ProductDetails,
  },
  {
    path: 'cart',
    component: Cart,
    canActivate: [authGuard],
  },
  {
    path: 'checkout',
    component: Checkout,
    canActivate: [authGuard],
  },
  {
    path: 'success',
    loadComponent: () => import('./features/success-page/success-page').then((m) => m.SuccessPage),
    canActivate: [authGuard],
  },
  {
    path: 'admin/add-product',
    component: AddProduct,
  },
  {
    path: 'admin/products-list',
    component: ProductsList,
  },
  {
    path: '**',
    component: PageNotFound,
  },
];
