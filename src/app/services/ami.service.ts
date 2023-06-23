import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ami } from '../models/Ami-model';
@Injectable({
  providedIn: 'root'
})
export class AmiService {

  constructor (private _httpClient: HttpClient) { }
  private Url = "https://localhost:7250/api/Ami/";

  AjouterAmi(amiId : string, utilisateurId : string ){
    return this._httpClient.post(this.Url + 'AddFriend?friendId='+ amiId +'&userId=' + utilisateurId,null)
  }

  GetAllFriend(id : string): Observable<Ami[]> {
    return this._httpClient.get<Ami[]>("https://localhost:7250/api/Ami?id=" + id);
  }
}