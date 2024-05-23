import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { client } from '../models/client';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  constructor(private http: HttpClient) {}

  getClients(): Observable<any> {
    return this.http.get(
      `${environment.baseURL}/Client/v1.0/Client/GetClients`,
      { observe: 'response' }
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
  updateClient(Client: client, id: string): Observable<any> {
    let name: string = Client.name;
    let PhoneNumber: string = Client.phoneNumber;
    return this.http.post(
      `${environment.baseURL}/Client/v1.0/Client/CreateClient`,
      { name: name, phoneNumber: PhoneNumber, id: id }
    );
  }
}
