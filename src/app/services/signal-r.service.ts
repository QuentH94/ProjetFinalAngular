import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {


  constructor(private hubConnection: HubConnection) {}


  startSignalRConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:7250/SignalRHub')//, { accessTokenFactory: () => sessionStorage.getItem('token') ?? '', transport: HttpTransportType.WebSockets })
      .build();
  
    this.hubConnection.start()
      .then(() => console.log('Connexion établie avec le hub SignalR'))
      .catch(err => console.log('Erreur lors de la connexion au hub SignalR :', err));
  
   }
}