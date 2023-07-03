import { HttpClient } from '@angular/common/http';
import { Injectable, Signal } from '@angular/core';
import { Observable } from 'rxjs';
import { MessagePrive } from '../models/MessagePrive-model';
@Injectable({
  providedIn: 'root'
})
export class MessagePriveService {

  constructor (private _httpClient: HttpClient) { }
   private url = "https://localhost:7250/api/MessagePrive/";

   
  GetAllMessagePrive(): Observable<MessagePrive[]>
  {
    return this._httpClient.get<MessagePrive[]>(this.url+"MessagePrive");
  } 
  AddMessagePrive(expediteur : number,destinataire : number, message : string){
   return this._httpClient.post(this.url + "AddMessagePrive?expediteur="+ expediteur + "&destinataire="+ destinataire +"&message=" + message,null)
  }

  GetLastMessageGlobal():Observable<MessagePrive>
  {
    return this._httpClient.get<MessagePrive>(this.url+"GetLastMessagePrive");
  }
}
