import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AdminComponent } from './admin/admin.component';
import { MenuComponent } from './client/menu/menu.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PizzaViewComponent } from './client/pizza-view/pizza-view.component';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { CartComponent } from './client/cart/cart.component';
import { CheckoutComponent } from './client/checkout/checkout.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { OrdersComponent } from './admin/orders/orders.component';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { OrderViewComponent } from './client/order-view/order-view.component';
import { PageWrapComponent } from './client/common/page-wrap/page-wrap.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { OrderDetailsComponent } from './admin/order-details/order-details.component';
import { OrderedPizzasComponent } from './admin/ordered-pizzas/ordered-pizzas.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    MenuComponent,
    PizzaViewComponent,
    CartComponent,
    CheckoutComponent,
    OrdersComponent,
    LoginComponent,
    OrderViewComponent,
    PageWrapComponent,
    OrderDetailsComponent,
    OrderedPizzasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatDialogModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
