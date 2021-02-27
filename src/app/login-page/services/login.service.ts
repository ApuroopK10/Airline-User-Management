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
  currentAuthStatus = this.authStatusListener.asObservable();
  private tokenTimer: any;

  constructor(private httpClient: HttpClient, private router: Router) {}

  authenticate(payload, type) {
    return this.httpClient.post(
      `${environment.BASE_URL}/authenticate/${type}`,
      payload,
      this.httpOptions
    );
  }

  // set login data after successful authentication
  setLoginData(data, token, expiresIn) {
    this.setUserData(data);
    this.setToken(token);
    this.setAuthTimer(expiresIn);
    // this.setAuthStatus(true);
    this.changeAuthStatus(true);
    const now = new Date();
    const expirationDate = new Date(now.getTime() + expiresIn * 1000);
    this.saveAuthData(token, expirationDate, this.userData);
  }

  // clear auth data before logout
  logOut() {
    this.token = null;
    this.changeAuthStatus(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  // change auth status and publish changes
  changeAuthStatus(authStatus: boolean) {
    this.authStatusListener.next(authStatus);
    this.isAuthenticated = authStatus;
  }

  // timer to clear auth token after expiration
  setAuthTimer(expiresIn: number) {
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

  // Save Auth Data after successful Authentication
  saveAuthData(token: string, expirationDate: Date, userData: User) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  // Clear Auth Data on Logout
  clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userData');
  }

  // get Auth data
  getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!token || !expirationDate) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
      userData,
    };
  }

  // auto authenticate user on browser refresh if valid is not expired
  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.userData = authInformation.userData;
      this.setAuthTimer(expiresIn / 1000);
      this.changeAuthStatus(true);
    }
  }
}
