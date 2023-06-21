import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profil } from 'src/app/models/Utilisateur-model';
import { UtilisateurService } from 'src/app/services/Utilisateur.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent  implements OnInit{
  constructor ( private _UtilisateurService : UtilisateurService, private router: Router) { }
  user : any;
  id: any;
  boutonDisable : boolean = false;
  connecte : boolean = false;
  
  

  ngOnInit(): void {
    this.id = this._UtilisateurService.IsLoggedIn();
    this._UtilisateurService.getUser(this.id).subscribe(res => { this.user = res;
    
    
    })
  }
  disableBouton(): void{
    if(sessionStorage.getItem('userid') == this.user.UtilisateurId)
    this.boutonDisable = true;
    
  }
  

}
