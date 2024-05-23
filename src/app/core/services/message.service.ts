import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from "../../../environments/environment";
import {createMessage, createMessageWithTemplate, message} from "../models/message";

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private http: HttpClient) {}

  public CreateMessage(msg: createMessage): Observable<message> {

    const formData = new FormData();
    formData.append('chatId', msg.chatId);
    formData.append('content', msg.content);
    formData.append('file', msg.file);

    return this.http.post<message>(environment.baseURL + `/Chat/v1.0/Message/CreateMessage`, formData);
  }

  public CreateMessageWithTemplate(msg: createMessageWithTemplate): Observable<message> {

    const formData = new FormData();
    formData.append('chatId', msg.chatId);
    formData.append('templateId', msg.templateId);

    return this.http.post<message>(environment.baseURL + `/Chat/v1.0/Message/CreateMessageWithTemplate`, formData);
  }

}
