import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'process';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserOpsService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
  constructor(private httpClient: HttpClient) { }

  userOperations(payload, type: string) {

      return this.httpClient.post(`${environment.BASE_URL}/operations/${type}`, payload, this.httpOptions);
  }
}
