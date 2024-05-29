import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  constructor(private http: HttpClient) {}

  getRoles(): Observable<any> {
    return this.http.get<any>(
      `${environment.baseURL}/SubUser/v1.0/Role/GetRoles`
    );
  }
}
