import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { client } from '../models/client';
import {Dictionary} from "../models/dictionary";

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  constructor(private http: HttpClient) {}

  getClients(
    pageSize: number,
    pageNumber: number
  ): Observable<HttpResponse<any>> {
    return this.http.get(
      `${environment.baseURL}/Client/v1.0/Client/GetClients?PageSize=${pageSize}&PageNumber=${pageNumber}`,
      { observe: 'response' }
    );
  }

  getLookUpClients(): Observable<Dictionary<string>> {
    return this.http.get<Dictionary<string>>(`${environment.baseURL}/Client/v1.0/Client/GetClientLookUps`);
  }

  getClientsNoPagation(): Observable<any> {
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
  updateClient(Client: client, id: string): Observable<any> {
    let name: string = Client.name;
    let PhoneNumber: string = Client.phoneNumber;
    return this.http.put(
      `${environment.baseURL}/Client/v1.0/Client/UpdateClient`,
      { name: name, phoneNumber: PhoneNumber, id: id }
    );
  }
  deleteClient(id: string): Observable<any> {
    return this.http.delete(
      `${environment.baseURL}/Client/v1.0/Client/DeleteClient?id=${id}`
    );
  }
}
