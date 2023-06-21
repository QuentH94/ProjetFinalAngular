import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login, Profil, Register } from '../models/Utilisateur-model';


@Injectable({
    providedIn: 'root'
  })

  export class UtilisateurService{
    constructor (private _httpClient: HttpClient) { }
    private Url = "https://localhost:7250/api/User";
    

   
    Register(Utilisateur: Register):Observable<Register> {
        return this._httpClient.post<Register>(this.Url, Utilisateur);
    }

    Login(Utilisateur: Login ):Observable<Login>{
      return this._httpClient.post<Login>(this.Url + '/Login',Utilisateur);
    }
    
    Logout(id: string) {
      const urlWithId = this.Url + '/Logout?id=' + id;
      return this._httpClient.put<null>(urlWithId, null)
    }

    IsLoggedIn(){
      return sessionStorage.getItem('userid');
    }

    getUser(id: string): Observable<Profil> {
      return this._httpClient.get<Profil>(this.Url + '/' + id);
  }

    
      
}