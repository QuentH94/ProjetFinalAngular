import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Profil } from '../models/Utilisateur-model';
import { UtilisateurService } from '../services/Utilisateur.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  user : any;
  Pseudo : any;
  id : any;
  avatar : any;
  userSearch : any;
  textSearch : any;
  searchForm = this.fb.nonNullable.group({
  textSearch: ''
  });
  

  constructor ( private _UtilisateurService : UtilisateurService, private router: Router, private fb : FormBuilder) {
   
    
  }
  

  

  ngOnInit(): void {
    this.id = this._UtilisateurService.IsLoggedIn();
    this._UtilisateurService.getUser(this.id).subscribe(res => { this.user = res;
    this.Pseudo = this.user.pseudo;
    this.avatar = this.user.pdp;
  })
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
    })

  }

  onSearchSubmit():void{
    this.textSearch = this.searchForm.value.textSearch ?? '';
    console.log(this.textSearch);
    this.searchBar();
    setTimeout (() => {
      this.reloadComponent();
      
   }, 500);
    
    
  }

  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/Profil2']);
}


}
