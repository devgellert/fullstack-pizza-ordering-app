import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { MenuComponent } from './client/menu/menu.component';
import { PizzaViewComponent } from './client/pizza-view/pizza-view.component';
import { CartComponent } from './client/cart/cart.component';
import { CheckoutComponent } from './client/checkout/checkout.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { IngredientComponent } from './admin/ingredient/ingredient.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';
import { OrderViewComponent } from './client/order-view/order-view.component';

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
      {
        component: IngredientComponent,
        path: 'ingredient',
      },
    ],
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
    component: LoginComponent,
    path: 'login',
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
