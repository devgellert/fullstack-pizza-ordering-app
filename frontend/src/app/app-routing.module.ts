import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ClientComponent } from './client/client.component';
import { MenuComponent } from './client/menu/menu.component';
import { PizzaViewComponent } from './client/pizza-view/pizza-view.component';
import { CartComponent } from './client/cart/cart.component';
import { CheckoutComponent } from './client/checkout/checkout.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    component: AdminComponent,
    path: 'admin',
    canActivate: [AuthGuard],
    children: [
      {
        component: OrdersComponent,
        path: 'orders',
      },
    ],
  },
  {
    component: ClientComponent,
    path: '',
    children: [
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
        component: LoginComponent,
        path: 'login',
      }
    ],
  },
  // {
  //   path: '**',
  //   redirectTo: ""
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
