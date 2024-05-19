import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { client } from '../models/client';

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
  addClient(Client: client): Observable<any> {
    let name: string = Client.name;
    let PhoneNumber: string = Client.phoneNumber;
    return this.http.post(
      `${environment.baseURL}/Client/v1.0/Client/CreateClient`,
      { name: name, phoneNumber: PhoneNumber }
    );
  }
}
