import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse, loginUserData } from '../models/login';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(userData: loginUserData): Observable<LoginResponse> {
    let email: string = userData.emailAddress;
    let password: string = userData.password;
    return this.http.post<LoginResponse>(
      `${environment.baseURL}/v1/Authentication/Login`,
      { emailAddress: email, password: password }
    );
  }

  getCurrentUser(): LoginResponse {
    return JSON.parse(sessionStorage.getItem('currentUser'));
  }
}
