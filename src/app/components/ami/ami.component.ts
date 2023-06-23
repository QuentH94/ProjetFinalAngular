import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Ami } from 'src/app/models/Ami-model';
import { AmiService } from 'src/app/services/ami.service';
import { UtilisateurService } from 'src/app/services/Utilisateur.service';

@Component({
  selector: 'app-ami',
  templateUrl: './ami.component.html',
  styleUrls: ['./ami.component.scss']
})
export class AmiComponent implements OnInit{
  constructor(private _UtilisateurService : UtilisateurService, private _AmiService : AmiService){}
  amis: any;
  id : any;
  helper = new JwtHelperService;

  ngOnInit(): void {
    let token = this.helper.decodeToken(sessionStorage.getItem('token') ?? '')
    this.id = token.nameid;
    this._AmiService.GetAllFriend(this.id).subscribe(res => {this.amis = res});
  }

}
