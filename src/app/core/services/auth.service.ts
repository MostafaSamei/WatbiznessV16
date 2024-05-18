import { ApiMainDataService } from './api-main-data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse, loginUserData } from '../models/login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private api: ApiMainDataService) {}

  login(userData: loginUserData): Observable<LoginResponse> {
    let email: string = userData.emailAddress;
    let password: string = userData.password;
    return this.http.post<LoginResponse>(
      `${this.api.baseURL}/v${this.api.version}/Authentication/Login`,
      { emailAddress: email, password: password }
    );
  }
  getCurrentUser(): boolean {
    if (sessionStorage.getItem('currentUser') != null) {
      return true;
    } else {
      return false;
    }
  }
}
