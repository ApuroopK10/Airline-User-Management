import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from './login-page/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Airline-Mgmt';
  showNav = false;
  authSub: Subscription;
  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit() {
    this.authSub = this.loginService.currentAuthStatus.subscribe((status) => {
      this.showNav = status;
    });
  }

  ngOnDestroy() {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }
}
