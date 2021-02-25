import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/shared/models/User.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private userData: User;
  private token: string;
  private isAuthenticated = false;
  authStatusListener = new BehaviorSubject(false);
  private currentAuthStatus = this.authStatusListener.asObservable();
  private tokenTimer: any;

  constructor(private httpClient: HttpClient, private router: Router) {}

  authenticate(payload, type) {
    return this.httpClient.post(
      `${environment.BASE_URL}/authenticate/${type}`,
      payload,
      this.httpOptions
    );
  }

  logOut() {
    this.token = null;
    this.changeAuthStatus(false);
    this.router.navigate(['/']);
  }

  changeAuthStatus(authStatus: boolean) {
    this.authStatusListener.next(authStatus);
    this.isAuthenticated = authStatus;
  }

  setTimer(expiresIn: number) {
    this.tokenTimer = setTimeout(() => {
      this.logOut();
    }, expiresIn * 1000);
  }

  setUserData(user: User) {
    this.userData = user;
  }

  getUserData(): User {
    return this.userData;
  }

  setToken(token: string) {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  getAuthStatus() {
    return this.isAuthenticated;
  }

  // setAuthStatus(isAuthenticated: boolean) {
  //   this.isAuthenticated = isAuthenticated;
  // }
}
