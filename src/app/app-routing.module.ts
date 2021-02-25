import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthGuard } from './login-page/services/auth.guard';
import { UserGridComponent } from './user-grid/user-grid.component';
import { UserManagementComponent } from './user-management/user-management.component';

const routes: Routes = [
  { path: '', component: LoginPageComponent },
  {
    path: 'landing',
    component: UserManagementComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'landing/users',
    component: UserGridComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
