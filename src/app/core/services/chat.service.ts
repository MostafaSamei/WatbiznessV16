import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {chat} from "../models/chat";
import {environment} from "../../../environments/environment";
import {groupchat} from "../models/groupchat";

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private http: HttpClient) {}

  public GetGroupChats(nameOrPhone: string): Observable<groupchat[]> {
    return this.http.get<groupchat[]>(environment.baseURL + `/Chat/v1.0/Chat/GetGroupChats?SearchTerm=${nameOrPhone}`);
  }

  public GetChats(): Observable<chat[]> {
    return this.http.get<chat[]>(environment.baseURL + `/Chat/v1.0/Chat/GetChats`);
  }

  public GetChat(clientId: string): Observable<chat> {
    return this.http.get<chat>(environment.baseURL + `/Chat/v1.0/Chat/GetChat?clientId=` + clientId);
  }

  public CreateChat(chat: any): Observable<chat> {
    return this.http.post<chat>(environment.baseURL + `/Chat/v1.0/Chat/CreateChat`, chat);
  }

  public DeleteChat(id: string): Observable<any> {
    return this.http.delete(environment.baseURL + `/Chat/v1.0/Chat/DeleteChat?id=`+ id);
  }
}
