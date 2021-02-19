import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  signUpForm = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  enableSignUp() {
    this.signUpForm = !this.signUpForm;
  }

  submitForm() {
    this.router.navigate(['/landing'])
  }
}
