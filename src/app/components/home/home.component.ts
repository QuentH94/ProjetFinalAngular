import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageGlobal, UserMessage } from 'src/app/models/MessageGlobal-model';
import { Profil } from 'src/app/models/Utilisateur-model';
import { MessageGlobalService } from 'src/app/services/message-global.service';
import { UtilisateurService } from 'src/app/services/Utilisateur.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  constructor(private _UtilisateurService : UtilisateurService,private _MessageGlobalService : MessageGlobalService, private fb: FormBuilder){}
  listUser : Profil[]=[];
  listMessageGlobal : MessageGlobal[] = []
  listUserMessage : UserMessage[]=[]
  currentId : any
  helper = new JwtHelperService;
  message : string = ''
  messageForm = this.fb.nonNullable.group({
    message: ''
  });

  ngOnInit(): void {
   let token = this.helper.decodeToken(sessionStorage.getItem('token') ?? '')
   this.currentId = token.nameid;
   this._UtilisateurService.getAll().subscribe(res => {this.listUser = res})
   this._MessageGlobalService.GetAllMessageGlobal().subscribe(res => {this.listMessageGlobal = res})
   
   setTimeout (() => {
    
     this.AfficherMessageGlobaux();
    
 }, 150);    

}

onSubmitMessage(){
  this.message = this.messageForm.value.message ?? '';
  this._MessageGlobalService.AddMessageGlobal(this.currentId,this.message).subscribe();
  console.log("envoie reussit")

}

  AfficherMessageGlobaux(){
    for(let u of this.listUser){
      this.listMessageGlobal.forEach(message => {
        if(u.utilisateurId == message.expediteur){
          const test = <UserMessage>{pdp : u.pdp, message : message.message, pseudo : u.pseudo, heure : message.heure, connecte : u.connecte};
          if(test){
            this.listUserMessage.push(test);
            console.log(test.message);
            console.log(test.heure);
            console.log(test.pseudo);
            console.log(test.connecte);
          }
        }
        
      })
        
      }
    }
}

