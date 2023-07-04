import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AmiService } from 'src/app/services/ami.service';
import { UtilisateurService } from 'src/app/services/Utilisateur.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { Profil } from 'src/app/models/Utilisateur-model';
import { MessagePriveService } from 'src/app/services/message-prive.service';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-profil-users',
  templateUrl: './profil-users.component.html',
  styleUrls: ['./profil-users.component.scss']
})
export class ProfilUsersComponent implements OnInit{

  constructor ( private _UtilisateurService : UtilisateurService, 
                private router: Router, 
                private _AmiService : AmiService, 
                private _Toastr : ToastrService,
                private _MessagePriveService : MessagePriveService,
                private fb: FormBuilder,) { }

  user! : Profil;
  id: any;
  currentUserId : any;
  helper = new JwtHelperService;
  messagePriveForm!: FormGroup;
  openform=false;
  message: string = '';
  

  ngOnInit(): void {
    this.id = sessionStorage.getItem('userSearch');
    this._UtilisateurService.getUser(this.id).subscribe(res => { this.user = res;
      let token = this.helper.decodeToken(sessionStorage.getItem('token') ?? '')
      this.currentUserId = token.nameid;
    })
    this.messagePriveForm = this.fb.group({     
      message: ['']
    });
  }
ajouterAmi(){
  this._AmiService.SendFriendResquest(this.id,this.currentUserId,this.currentUserId).subscribe(res => {
    this._Toastr.success("Demande d'ami envoyée");
    
  });
}

messagePrive(){
this.message = this.messagePriveForm.value.message ?? '';
this._MessagePriveService.AddMessagePrive(this.currentUserId,this.id,this.message).subscribe(res => {
this._Toastr.info("Message envoyé")});
this.openform=false;
}


onClickOpenForm(){
  this.openform=true;
  }
  

}
