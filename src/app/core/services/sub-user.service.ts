import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SubUser } from '../models/sub-user';

@Injectable({
  providedIn: 'root',
})
export class SubUserService {
  constructor(private http: HttpClient) {}
  getSubUsers(
    pageSize: number,
    pageNumber: number
  ): Observable<HttpResponse<any>> {
    return this.http.get(
      `${environment.baseURL}/SubUser/v1.0/SubUser/GetSubUsers?PageSize=${pageSize}&PageNumber=${pageNumber}`,
      { observe: 'response' }
    );
  }
  addSubUser(body: SubUser): Observable<any> {
    return this.http.post(
      `${environment.baseURL}/SubUser/v1.0/SubUser/CreateSubUser`,
      {
        firstName: body.firstName,
        lastName: body.lastName,
        roleId: body.roleId,
        password: body.password,
        emailAddress: body.emailAddress,
        phoneNumber: body.phoneNumber,
      }
    );
  }
  updateSubUser(body: SubUser): Observable<any> {
    return this.http.post(
      `${environment.baseURL}/SubUser/v1.0/SubUser/CreateSubUser`,
      {
        firstName: body.firstName,
        lastName: body.lastName,
        roleId: body.roleId,
        password: body.password,
        emailAddress: body.emailAddress,
        phoneNumber: body.phoneNumber,
        id: body.id,
      }
    );
  }
  deleteSubUser(id: string): Observable<any> {
    return this.http.delete(
      `${environment.baseURL}/SubUser/v1.0/SubUser/DeleteSubUser?id=${id}`
    );
  }
}
