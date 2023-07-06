import { Component, OnInit } from '@angular/core';
import { MessagePrive, UserMessagePrive } from 'src/app/models/MessagePrive-model';
import { MessagePriveService } from 'src/app/services/message-prive.service';
import { UtilisateurService } from 'src/app/services/Utilisateur.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-message-prive',
  templateUrl: './message-prive.component.html',
  styleUrls: ['./message-prive.component.scss']
})
export class MessagePriveComponent implements OnInit {

  constructor(private _messagePriveService : MessagePriveService, 
              private _UtilisateurService : UtilisateurService, 
              private fb: FormBuilder,){}



allMessagePrive : MessagePrive[] = []
currentId : string = '';
helper = new JwtHelperService;
listMessagePrive : UserMessagePrive[] = [];
test : UserMessagePrive [] = [];
listMessagePriveByUser : UserMessagePrive [] = [];
message: string = '';
messageForm! : FormGroup;
destinataire! : number;


  ngOnInit(): void {
    let token = this.helper.decodeToken(sessionStorage.getItem('token') ?? '')
    this.currentId = token.nameid;
    this._messagePriveService.GetAllMessagePrive().subscribe(res  => { this.allMessagePrive = res})
    this.messageForm = this.fb.group({
      message: ''
    });
    setTimeout (() => {
     this.recupMessagePriveDuCurrentId();
    }, 300);

    setTimeout (() => {
     this.afficherUtilisateur(); 
     }, 1000);
  }

  
  async recupMessagePriveDuCurrentId(){
    this._messagePriveService.GetAllMessagePrive().subscribe(res  => { this.allMessagePrive = res})
    for(let mess of this.allMessagePrive){
      if(mess.destinataire.toString() == this.currentId || mess.expediteur.toString() == this.currentId){
        if(mess.expediteur.toString() == this.currentId){   
          const user = await this._UtilisateurService.getUser(mess.destinataire.toString()).toPromise();
           if(user){
             const test = <UserMessagePrive>{     
             utilisateurId :user.utilisateurId,            
             message : mess.message,
             heure : mess.heure,
             pdp : user.pdp,
             pseudo : user.pseudo,
             destinataire : user.utilisateurId,
             expediteur : Number(this.currentId),
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
            pseudo : user.pseudo,
            destinataire : Number(this.currentId),
            expediteur : user.utilisateurId,
          }        
          this.listMessagePrive.push(test);        
        }
       }
      }
     }
    }

  afficherUtilisateur(){    
    if(this.listMessagePrive){
      console.log(this.listMessagePrive)
      for(const item of this.listMessagePrive) {
        const isDuplicate = this.test.find((obj) => (obj.utilisateurId == item.utilisateurId));     
        if (!isDuplicate) {          
         this.test.push(item);      
         //console.log(this.test);                   
        }
      }
    }
  }


  afficherMessage(id : number){
    this.destinataire = id;
    this.listMessagePrive = [];
       setTimeout (() => {
     this.recupMessagePriveDuCurrentId();
    }, 300);
    setTimeout (() => {
    //console.log(this.listMessagePrive)
      console.log(id)
    for(let mess of this.listMessagePrive){ 
      if((mess.destinataire == id && mess.expediteur == Number(this.currentId)) || (mess.expediteur == id && mess.destinataire == Number(this.currentId))){
        this.listMessagePriveByUser.push(mess);      
        console.log(mess.pseudo);            
        console.log(this.listMessagePriveByUser);   
      }   
    }}, 400);
  }


  onSubmitMessage(): void {
    this.message = this.messageForm.value.message ?? '';
    this._messagePriveService.AddMessagePrive(Number(this.currentId),this.destinataire, this.message).subscribe(() => {
      console.log("Envoi réussi");
      this.messageForm.reset();               
    }, error => {       
      console.error("Erreur lors de l'envoi du message :", error);
    });    
  }
}