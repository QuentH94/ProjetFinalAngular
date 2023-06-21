import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilisateurService } from 'src/app/services/Utilisateur.service';

@Component({
  selector: 'app-profil-users',
  templateUrl: './profil-users.component.html',
  styleUrls: ['./profil-users.component.scss']
})
export class ProfilUsersComponent implements OnInit{
  constructor ( private _UtilisateurService : UtilisateurService, private router: Router) { }
  user : any;
  id: any;
  boutonDisable : boolean = false;
  ngOnInit(): void {
    this.id = sessionStorage.getItem('userSearch');
    this._UtilisateurService.getUser(this.id).subscribe(res => { this.user = res;
    
    })
  }
  disableBouton(): void{
    if(sessionStorage.getItem('userid') == this.user.utilisateurId)
    this.boutonDisable = true;
  }
}
