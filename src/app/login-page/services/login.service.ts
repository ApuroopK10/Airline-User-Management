import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  constructor(private httpClient: HttpClient) {}

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
  }

  changeAuthStatus(authStatus: boolean) {
    this.authStatusListener.next(authStatus);
    this.isAuthenticated = authStatus;
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
