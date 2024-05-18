import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse, loginUserData } from '../models/login';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(userData: loginUserData): Observable<LoginResponse> {
    let email: string = userData.emailAddress;
    let password: string = userData.password;
    return this.http.post<LoginResponse>(
      `${environment.baseURL}/v1.0/Authentication/Login`,
      { emailAddress: email, password: password }
    );
  }

  getCurrentUser(): boolean {
    return sessionStorage.getItem('currentUser') != null;
  }
}
