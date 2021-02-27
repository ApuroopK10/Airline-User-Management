import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription, timer } from 'rxjs';
import { roles } from '../app.constants';
import { User } from '../shared/models/User.model';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  providers: [MessageService],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  signUpForm = false;
  user: User = new User('', '', '', '', []);
  userRoles;
  isLoading = false;
  userAuthSub: Subscription;
  constructor(
    private router: Router,
    private loginService: LoginService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.userRoles = roles;
  }

  enableSignUp() {
    this.signUpForm = !this.signUpForm;
  }

  authenticate() {
    this.isLoading = true;
    const { name, email, password, role, children } = this.user;
    const serviceType = this.signUpForm ? 'signUp' : 'login';
    const payload = this.signUpForm
      ? { name, email, password, role: role['value'], children }
      : { email, password };
    this.userAuthSub = this.loginService
      .authenticate(payload, serviceType)
      .subscribe(
        (response) => {
          timer(500).subscribe((e) => {
            this.isLoading = false;
            this.loginService.setLoginData(
              response['data'],
              response['token'],
              response['expiresIn']
            );
            // this.messageService.add({
            //   severity: 'success',
            //   life: 5000,
            //   summary: 'Success',
            //   detail: `${serviceType} complete`,
            // });
            this.router.navigate(['/landing']);
          });
        },
        (apiError) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `Failed to ${serviceType} - ${apiError.error.error}`,
          });
          this.isLoading = false;
          this.loginService.changeAuthStatus(false);
        }
      );
  }

  ngOnDestroy() {
    if (this.userAuthSub) {
      this.userAuthSub.unsubscribe();
    }
  }
}
