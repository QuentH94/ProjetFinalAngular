import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: HubConnection;

  constructor() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:7250/MessageGlobalHub') // Remplacez l'URL par celle de votre hub
      .build();

    this.hubConnection.start()
      .then(() => console.log('Connexion SignalR établie.'))
      .catch(error => console.error('Erreur lors de la connexion SignalR :', error));
  }
}