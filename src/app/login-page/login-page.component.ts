import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { roles } from '../app.constants';
import { User } from '../shared/models/User.model';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  providers: [MessageService]
})
export class LoginPageComponent implements OnInit {

  signUpForm = false;
  user: User = new User('', '', '', '', []);
  userRoles;
  isLoading = false;
  constructor(private router: Router, private loginService: LoginService, 
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.userRoles = roles;
  }

  enableSignUp() {
    this.signUpForm = !this.signUpForm;
  }

  submitForm() {
    this.isLoading = true;
    this.user.role = this.user.role['value'];
    if(this.signUpForm) {
      this.loginService.signUp(this.user).subscribe(data => {
        timer(500).subscribe(e => {
        console.log('data', data);
        this.isLoading = false;
        this.messageService.add({severity: 'success', life: 5000 , summary: 'Success', detail: 'Signup complete'});
        this.router.navigate(['/landing']);
        });
      }, error => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Failed to Sign-in'});
        this.isLoading = false;
      });
    }
    
  }
}
