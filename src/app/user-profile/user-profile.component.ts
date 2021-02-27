import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login-page/services/login.service';
import { User } from '../shared/models/User.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  loggedInUser: User;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.loggedInUser = this.loginService.getUserData();
  }
}
