import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from "./admin/admin.component";
import {ClientComponent} from "./client/client.component";

const routes: Routes = [
  {
    component: AdminComponent,
    path: 'admin',
  },
  // {
  //   component: ClientComponent,
  //   path: ''
  // },
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
