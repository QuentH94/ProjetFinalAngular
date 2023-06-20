import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login, Profil, Register } from '../models/Utilisateur-model';


@Injectable({
    providedIn: 'root'
  })

  export class UtilisateurService{
    constructor (private _httpClient: HttpClient) { }
    private postUrl = "https://localhost:7250/api/User";
    

   
    Register(Utilisateur: Register):Observable<Register> {
        return this._httpClient.post<Register>(this.postUrl, Utilisateur);
    }

    Login(Utilisateur: Login ):Observable<Login>{
      return this._httpClient.post<Login>(this.postUrl + '/Login',Utilisateur);
    }
    
    IsLoggedIn(){
      return sessionStorage.getItem('userid');
    }

    getUser(id: string): Observable<Profil> {
      return this._httpClient.get<Profil>(this.postUrl + '/' + id);
  }

    
      
}