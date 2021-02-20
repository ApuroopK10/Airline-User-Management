import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/models/User.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
userData: User;

  constructor(private httpClient: HttpClient) { }

  signUp (payload) {
    return this.httpClient.post(`http://localhost:3002/authenticate/signup`, payload, this.httpOptions);
  }

  setUserData(user: User) {
    this.userData = user;
  }

  getUserData() : User {
    return this.userData;
  }
}
