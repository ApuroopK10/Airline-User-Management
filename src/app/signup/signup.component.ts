import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Subscription } from 'rxjs';
import { roles } from '../app.constants';
import { LoginService } from '../login-page/services/login.service';
import { User } from '../shared/models/User.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  user: User = new User();
  userRoles: Array<object>;
  isLoading = false;
  userAuthSub: Subscription;
  registerForm: FormGroup;
  submitted = false;
  constructor(
    private router: Router,
    private loginService: LoginService,
    private messageService: MessageService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userRoles = roles;
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
    });
  }

  // getter method for form control fields to validate
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    this.authenticate();
  }

  authenticate() {
    this.isLoading = true;
    const { name, email, password, role } = this.registerForm.value;
    const serviceType = 'signUp';
    const payload = {
      name,
      email,
      password,
      role: role['value'],
      children: [],
    };
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

  backToLogin() {
    this.router.navigate(['/login']);
  }
}
