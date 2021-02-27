import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthGuard } from './login-page/services/auth.guard';
import { SignupComponent } from './signup/signup.component';
import { UserGridComponent } from './user-grid/user-grid.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupComponent },
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
  {
    path: 'landing/profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
