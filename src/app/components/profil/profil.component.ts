import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilisateurService } from 'src/app/services/Utilisateur.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Profil } from 'src/app/models/Utilisateur-model';
import { Ami } from 'src/app/models/Ami-model';
import { AmiService } from 'src/app/services/ami.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent  implements OnInit{
  constructor ( private fb: FormBuilder, private _UtilisateurService : UtilisateurService, private router: Router, private _AmiService : AmiService) { }
  user! : Profil;
  amis! : Ami[];
  id: any;
  updateData!: FormGroup;
  openform=false;
  helper = new JwtHelperService;
  
  

  ngOnInit(): void {
    let token = this.helper.decodeToken(sessionStorage.getItem('token') ?? '')
    this.id = token.nameid;
    this._UtilisateurService.getUser(this.id).subscribe(res => { this.user = res;
  
    });
    this.updateData = this.fb.group({     
      nom: [''],
      prenom: [''],
    });
  }

  UpdateNomPrenom(){
    this._UtilisateurService.UpdateNomPrenom(this.updateData.value, this.id).subscribe(res => {
      console.log("success");
    })


  }
  onClickOpenForm(){
    this.openform=true;
    }
  
   

}
