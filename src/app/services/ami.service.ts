import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ami, Invitation } from '../models/Ami-model';
@Injectable({
  providedIn: 'root'
})
export class AmiService {

  constructor (private _httpClient: HttpClient) { }
  private Url = "https://localhost:7250/api/Ami/";

 
  SendFriendResquest(user1 : string, user2 : string, demandeur : string){
    return this._httpClient.post(this.Url + "SendFriendResquest?user1="+ user1 +"&user2=" + user2 + "&demandeur=" + demandeur,null);
  }

  GetAllFriend(): Observable<Ami[]> {
    return this._httpClient.get<Ami[]>("https://localhost:7250/api/Ami/Ami");
  }
  GetAllInvitation(): Observable<Invitation[]>{
    return this._httpClient.get<Invitation[]>("https://localhost:7250/api/Ami/Invitation");
  }
  Accepted(id : number){
    return this._httpClient.put(this.Url + "Accepted?id="+ id,null);
  }
  Refused(id : number){
    return this._httpClient.put(this.Url + "Refused?id="+ id,null);
  }
  DeleteFriend(currentUser:number, ami:number){
    return this._httpClient.delete(this.Url+ "DeleteFriend?user1=" + currentUser + "&user2=" + ami);
  }


}
