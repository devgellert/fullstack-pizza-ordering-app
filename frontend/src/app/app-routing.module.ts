import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from "./admin/admin.component";
import {ClientComponent} from "./client/client.component";
import {MenuComponent} from "./client/menu/menu.component";

const routes: Routes = [
  {
    component: AdminComponent,
    path: 'admin',
  },
  {
    component: ClientComponent,
    path: '',
    children: [
      {
        component: MenuComponent,
        path: 'menu'
      }
    ]
  },
  // {
  //   path: '**',
  //   redirectTo: ""
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
