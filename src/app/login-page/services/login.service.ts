import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

  constructor(private httpClient: HttpClient) { }

  signUp (payload) {
    return this.httpClient.post(`http://localhost:3002/authenticate/signup`, payload, this.httpOptions);
  }
}
