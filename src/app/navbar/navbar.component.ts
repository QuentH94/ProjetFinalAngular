import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilisateurService } from '../services/Utilisateur.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  constructor ( private _UtilisateurService : UtilisateurService, private router: Router) { }
  user : any;
  Pseudo : any;
  id : any;
  ngOnInit(): void {
    this.id = this._UtilisateurService.IsLoggedIn();
    this._UtilisateurService.getUser(this.id).subscribe(res => { this.user = res;
    this.Pseudo = this.user.pseudo;
    console.log(this.Pseudo);
  })
  }

}
