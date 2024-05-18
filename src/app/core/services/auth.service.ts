import { ApiMainDataService } from './api-main-data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse, loginUserData } from '../models/login';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<LoginResponse>;
  constructor(private http: HttpClient, private api: ApiMainDataService) {
    this.currentUserSubject = new BehaviorSubject<LoginResponse>(
      JSON.parse(sessionStorage.getItem('currentUser')!)
    );
  }

  login(userData: loginUserData): Observable<LoginResponse> {
    let email: string = userData.emailAddress;
    let password: string = userData.password;
    return this.http.post<LoginResponse>(
      `${this.api.baseURL}/v${this.api.version}/Authentication/Login`,
      { emailAddress: email, password: password }
    );
  }
  /**
   * Returns the current user
   */
  public currentUser(): any {
    return this.currentUserSubject.value;
  }

  /**
   * Setting current user
   */
  public setCurrentUser(user: LoginResponse): any {
    this.currentUserSubject.next(user);
  }
  getCurrentUser(): boolean {
    if (sessionStorage.getItem('currentUser') != null) {
      return true;
    } else {
      return false;
    }
  }
}
