import { ApiMainDataService } from './api-main-data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  constructor(private http: HttpClient, private api: ApiMainDataService) {}

  getClients(): Observable<any> {
    return this.http.get(
      `${this.api.baseURL}/Client/v${this.api.version}/Client/GetClients`
    );
  }
}
