import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  private hubConnection: signalR.HubConnection;

  // Observable to emit messages received from the server
  private messageReceived = new Subject<{ userId: string, message: string }>();
  messageReceived$ = this.messageReceived.asObservable();

  constructor() {

    let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.baseURL + `/chathub?access_token=${currentUser.token}`)  // Adjust the URL based on your SignalR hub configuration
      .build();

    // Handle the "ReceiveMessage" event from the server
    this.hubConnection
      .on('ReceiveMessage', (userId: string, message: string, file: string, type: string) => {
      this.messageReceived.next({ userId, message });
    });

    // Start the connection
    this.startConnection();
  }

  private startConnection(): void {
    this.hubConnection.start()
      .then(() => console.log('SignalR connection started'))
      .catch(err => console.error('Error while starting SignalR connection: ' + err));
  }
}
