import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AmiService } from 'src/app/services/ami.service';
import { UtilisateurService } from 'src/app/services/Utilisateur.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-profil-users',
  templateUrl: './profil-users.component.html',
  styleUrls: ['./profil-users.component.scss']
})
export class ProfilUsersComponent implements OnInit{
  constructor ( private _UtilisateurService : UtilisateurService, private router: Router, private _AmiService : AmiService, private _Toastr : ToastrService) { }
  user : any;
  id: any;
  currentId : any;
  helper = new JwtHelperService;
  

  ngOnInit(): void {
    this.id = sessionStorage.getItem('userSearch');
    this._UtilisateurService.getUser(this.id).subscribe(res => { this.user = res;
      let token = this.helper.decodeToken(sessionStorage.getItem('token') ?? '')
      this.currentId = token.nameid;
    
    })
  }
ajouterAmi(){
  this._AmiService.AjouterAmi(this.id,this.currentId).subscribe(res => {
    this._Toastr.success("Demande d'ami envoyée");
    
  });
}
  

}
