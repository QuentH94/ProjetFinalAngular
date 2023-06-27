import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profil } from 'src/app/models/Utilisateur-model';
import { AmiService } from 'src/app/services/ami.service';
import { UtilisateurService } from 'src/app/services/Utilisateur.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  constructor(private _UtilisateurService : UtilisateurService, private _AmiService : AmiService, private router: Router){}
  listUser : Profil[]=[];
  ngOnInit(): void {
   this._UtilisateurService.getAll().subscribe(res => {this.listUser = res})
   
  }

}
