import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/models/User.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  public userData: User;

  constructor(private httpClient: HttpClient) {}

  authenticate(payload, type) {
    return this.httpClient.post(
      `${environment.BASE_URL}/authenticate/${type}`,
      payload,
      this.httpOptions
    );
  }

  setUserData(user: User) {
    this.userData = user;
  }

  getUserData(): User {
    return this.userData;
  }
}
