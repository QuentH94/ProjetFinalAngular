import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageGlobal } from '../models/MessageGlobal-model';

@Injectable({
  providedIn: 'root'
})
export class MessageGlobalService {

   constructor (private _httpClient: HttpClient) { }
   private url = "https://localhost:7250/api/Message/";

  GetAllMessageGlobal(): Observable<MessageGlobal[]>
  {
    return this._httpClient.get<MessageGlobal[]>(this.url+"MessageGlobal");
  } 
  AddMessageGlobal(expediteur : number, message : string){
   return this._httpClient.post(this.url + "AddMessageGlobal?expediteur="+ expediteur +"&message=" + message,null)
  }
}
