import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  constructor(private http: HttpClient) {}

  getClients(): Observable<any> {
    return this.http.get(
      `${environment.baseURL}/Client/v1.0/Client/GetClients`
    );
  }
}
