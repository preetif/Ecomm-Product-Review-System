import { Routes } from '@angular/router';
import { CustomerLayout } from './layout/customer-layout/customer-layout';
import { Home } from './customer/home/home';
import { Product } from './customer/product/product';
import { Categories } from './customer/categories/categories';
import { About } from './customer/about/about';

export const routes: Routes = [
  {
    path: 'customer',
    component: CustomerLayout,
    children: [
      {
        path: 'home',
        component: Home
      },
      {path: 'product', component: Product},
      {path: 'categories', component: Categories},
      {path: 'about', component: About},

      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];