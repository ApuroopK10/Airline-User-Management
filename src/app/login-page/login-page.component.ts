import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
})
export class LoginPageComponent implements OnInit, OnDestroy {
  user: User = new User();
  userRoles;
  isLoading = false;
  userAuthSub: Subscription;
  loginForm: FormGroup;
  submitted = false;
  constructor(
    private router: Router,
    private loginService: LoginService,
    private messageService: MessageService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userRoles = roles;
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // getter method for form control fields to validate
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    this.authenticate();
  }

  enableSignUp() {
    this.router.navigate(['/signup']);
  }

  authenticate() {
    this.isLoading = true;
    const { email, password } = this.loginForm.value;
    const serviceType = 'login';
    const payload = { email, password };
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
