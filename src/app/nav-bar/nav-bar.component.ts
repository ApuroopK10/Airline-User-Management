import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login-page/services/login.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  constructor(private loginService: LoginService) {}
  loggedInUser: string;
  ngOnInit(): void {
    this.loggedInUser = this.loginService.getUserData().role;
  }

  onLogOut() {
    this.loginService.logOut();
  }
}
