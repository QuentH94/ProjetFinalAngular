import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilisateurService } from '../services/Utilisateur.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Ami } from '../models/Ami-model';
import { AmiService } from '../services/ami.service';
import { Profil, Utilisateur } from '../models/Utilisateur-model';




@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  amis! : Ami[];
  test! : Profil;
  count : number = 0;
  user! : Profil;
  Pseudo : any;
  id : any;
  avatar : any;
  userSearch : any;
  textSearch : any;
  searchForm = this.fb.nonNullable.group({
  textSearch: ''
});
helper = new JwtHelperService;



  constructor ( private _UtilisateurService : UtilisateurService, 
                private router: Router, 
                private fb : FormBuilder,              
                private _AmiService : AmiService) {}
  

  

  ngOnInit(): void {
    this.count = 0;
    let token = this.helper.decodeToken(sessionStorage.getItem('token') ?? '')
    this.id = token.nameid;
    this._UtilisateurService.getUser(this.id).subscribe(res => { this.user = res;
    this.Pseudo = this.user.pseudo;
    this.avatar = this.user.pdp;
    });
    this._AmiService.GetAllFriend().subscribe(res => {this.amis = res});
    setTimeout (() => {
      this.affichageAmi();     
   }, 280);
   
  }
    
    async affichageAmi() {
      if(this.amis){
        for (const ami of this.amis) {
          if(this.id == ami.utilisateur1 || this.id == ami.utilisateur2){
            if(this.id == ami.utilisateur1){
              const user2 =  await this._UtilisateurService.getUser(ami.utilisateur2.toString()).toPromise();
              if (user2 && user2.connecte) {
                this.count ++;
              }
            }else{           
                  const user2 =  await this._UtilisateurService.getUser(ami.utilisateur1.toString()).toPromise();
                  if (user2 && user2.connecte) {
                    this.count ++;
                  }
            }
          }
        }
      }         
    }
    


  Logout() : void {
    this._UtilisateurService.Logout(this.id).subscribe();
    console.log(this.id);
    sessionStorage.clear;
    this.router.navigate(['Login']);
  }

  

  searchBar(): void{
    this._UtilisateurService.getUserByPseudo(this.textSearch).subscribe(res => {
      this.userSearch = res;
      if(this.userSearch != null){
        sessionStorage.setItem('userSearch', this.userSearch.utilisateurId);    
      }
    },
    error => {
      alert("Utilisateur inconnu !");
    })
  }

  onSearchSubmit():void{
    this.textSearch = this.searchForm.value.textSearch ?? '';
    //console.log(this.textSearch);
    this.searchBar();
    setTimeout (() => {
      this.reloadComponent();
      
   }, 100);
    
  }

  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/ProfilUsers']);
}



}
