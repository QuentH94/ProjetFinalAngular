import { Component, OnInit } from '@angular/core';
import { MessagePrive, UserMessagePrive } from 'src/app/models/MessagePrive-model';
import { MessagePriveService } from 'src/app/services/message-prive.service';
import { UtilisateurService } from 'src/app/services/Utilisateur.service';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-message-prive',
  templateUrl: './message-prive.component.html',
  styleUrls: ['./message-prive.component.scss']
})
export class MessagePriveComponent implements OnInit {

  constructor(private _messagePriveService : MessagePriveService, private _UtilisateurService : UtilisateurService, ){}

allMessagePrive : MessagePrive[] = []
currentId : string = '';
helper = new JwtHelperService;
listMessagePrive : UserMessagePrive[] = [];
test : UserMessagePrive [] = [];

  ngOnInit(): void {
    let token = this.helper.decodeToken(sessionStorage.getItem('token') ?? '')
    this.currentId = token.nameid;
    this._messagePriveService.GetAllMessagePrive().subscribe(res  => { this.allMessagePrive = res})
    setTimeout (() => {
     this.recupMessagePriveDuCurrentId();
     
    }, 900);
 console.log(this.listMessagePrive);
 
    this.afficherMessage();

    console.log(this.test);
  }

  async recupMessagePriveDuCurrentId(){

    for(let mess of this.allMessagePrive){
      if(mess.destinataire.toString() == this.currentId || mess.expediteur.toString() == this.currentId){
        if(mess.expediteur.toString() == this.currentId){
          const user = await this._UtilisateurService.getUser(mess.destinataire.toString()).toPromise();
           if(user){
             const test = <UserMessagePrive>{    
            utilisateurId : user.utilisateurId,       
             message : mess.message,
             heure : mess.heure,
             pdp : user.pdp,
             connecte : user.connecte,
             pseudo : user.pseudo,
           }
           this.listMessagePrive.push(test);
           }       
        }else{
         const user = await this._UtilisateurService.getUser(mess.expediteur.toString()).toPromise()
          if(user){
            const test = <UserMessagePrive>{
            utilisateurId : user.utilisateurId,
            message : mess.message,
            heure : mess.heure,
            pdp : user.pdp,
            connecte : user.connecte,
            pseudo : user.pseudo,
          }        
          this.listMessagePrive.push(test);        
        }
       }
      }
    }
  }

  afficherMessage(){  
    if(this.listMessagePrive){
      for(let item of this.listMessagePrive) {
        const isDuplicate = this.test.find((obj) => obj.utilisateurId == item.utilisateurId);
        if (!isDuplicate) {
         this.test.push(item);                 
        }
    }
  }


}
}