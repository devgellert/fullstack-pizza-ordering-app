import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { MenuComponent } from './client/menu/menu.component';
import { PizzaViewComponent } from './client/pizza-view/pizza-view.component';
import { CartComponent } from './client/cart/cart.component';
import { CheckoutComponent } from './client/checkout/checkout.component';
import { OrderViewComponent } from './client/order-view/order-view.component';

const routes: Routes = [
  {
    component: AdminComponent,
    path: 'admin',
  },
  {
    redirectTo: '/menu',
    path: '',
    pathMatch: 'full',
  },
  {
    component: MenuComponent,
    path: 'menu',
  },
  {
    component: PizzaViewComponent,
    path: 'menu/:id',
  },
  {
    component: CartComponent,
    path: 'cart',
  },
  {
    component: CheckoutComponent,
    path: 'checkout',
  },
  {
    component: OrderViewComponent,
    path: 'order/:id',
  },
  {
    path: '**',
    redirectTo: '/menu',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
