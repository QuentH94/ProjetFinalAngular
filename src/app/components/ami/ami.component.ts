import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Ami } from 'src/app/models/Ami-model';
import { Profil } from 'src/app/models/Utilisateur-model';
import { AmiService } from 'src/app/services/ami.service';
import { UtilisateurService } from 'src/app/services/Utilisateur.service';

@Component({
  selector: 'app-ami',
  templateUrl: './ami.component.html',
  styleUrls: ['./ami.component.scss']
})
export class AmiComponent implements OnInit{
  constructor(private _UtilisateurService : UtilisateurService, private _AmiService : AmiService){}
  amis!: Ami[];
  
  listUser : Profil[] = [];
  id : any;
  helper = new JwtHelperService;
  isFound = false;


  ngOnInit(): void {
    let token = this.helper.decodeToken(sessionStorage.getItem('token') ?? '')
    this.id = token.nameid;
    this._AmiService.GetAllFriend().subscribe(res => {this.amis = res});
    setTimeout (() => {
      this.loadAmi();     
   }, 200);
     
  
    this.DemandeAmi();

  }

  DemandeAmi(){
    
  }
  async loadAmi() {
    if (this.amis) {
      for (const ami of this.amis) {
        if (this.id == ami.utilisateur1 || this.id == ami.utilisateur2) {
          if (this.id == ami.utilisateur1) {
            const user = await this._UtilisateurService.getUser(ami.utilisateur2.toString()).toPromise();
            if (user) {
              this.listUser.push(user);
            }
          } else {
            const user = await this._UtilisateurService.getUser(ami.utilisateur1.toString()).toPromise();
            if (user) {
              this.listUser.push(user);
            }
          }
        }
      }
    }
  }
}