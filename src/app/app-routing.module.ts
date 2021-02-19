import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { UserGridComponent } from './user-grid/user-grid.component';
import { UserManagementComponent } from './user-management/user-management.component';


const routes: Routes = [
  {path: '', component: LoginPageComponent},
  {path: 'landing', component: UserManagementComponent},
  {path: 'landing/users', component: UserGridComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
