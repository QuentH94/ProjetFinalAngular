import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login, Profil, Register, UpdateNomPrenom } from '../models/Utilisateur-model';


@Injectable({
    providedIn: 'root'
  })

  export class UtilisateurService{
    constructor (private _httpClient: HttpClient) { }
    private Url = "https://localhost:7250/api/User";
    

   
    Register(Utilisateur: Register):Observable<Register> {
        return this._httpClient.post<Register>(this.Url, Utilisateur);
    }

    Login(Utilisateur: Login ):Observable<string>{
      return this._httpClient.post(this.Url + '/Login',Utilisateur,{ 'responseType': 'text' });
    }
    
    Logout(id: string) {
      const urlWithId = this.Url + '/Logout?id=' + id;
      return this._httpClient.put<null>(urlWithId, null)
    }

    IsLoggedIn(){
      return sessionStorage.getItem('token');
    }

    getUser(id: string): Observable<Profil> {
      return this._httpClient.get<Profil>(this.Url + '/' + id);
    }

    getAll(): Observable<Profil[]> {
      return this._httpClient.get<Profil[]>(this.Url);
    }
  
    getUserByPseudo(p:string): Observable<Profil>{
      return this._httpClient.get<Profil>(this.Url + '/pseudo?pseudo=' + p)
    }

    UpdateNomPrenom(data : UpdateNomPrenom,id: string){
      return this._httpClient.patch<null>(this.Url + '/NomPrenom?id=' + id, data)
    }


    
      
}