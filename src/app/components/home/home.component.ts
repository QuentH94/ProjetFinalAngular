import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageGlobal, UserMessage } from 'src/app/models/MessageGlobal-model';
import { Profil } from 'src/app/models/Utilisateur-model';
import { MessageGlobalService } from 'src/app/services/message-global.service';
import { UtilisateurService } from 'src/app/services/Utilisateur.service';
import { HttpTransportType, HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';
import { SignalRService } from 'src/app/services/signal-r.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  listUser : Profil[]=[];
  listMessageGlobal : MessageGlobal[] = [];
  listUserMessage : UserMessage[]=[];
  lastMessage! : UserMessage;
  currentId : any;
  helper = new JwtHelperService;
  message: string = '';
  messageForm: FormGroup;

  constructor(
    private _UtilisateurService: UtilisateurService,
    private _MessageGlobalService: MessageGlobalService,
    private fb: FormBuilder,
    private hubConnection: HubConnection,
    private _Toastr : ToastrService,
    
  ) {
    this.messageForm = this.fb.group({
      message: ''
    });
  }


  
  ngOnInit(): void {
   let token = this.helper.decodeToken(sessionStorage.getItem('token') ?? '')
   this.currentId = token.nameid;
     this.AfficherMessageGlobaux();   
     this.startSignalRConnection();    
}

onSubmitMessage(): void {
  this.message = this.messageForm.value.message ?? '';
  this._MessageGlobalService.AddMessageGlobal(this.currentId, this.message).subscribe(() => {
    console.log("Envoi réussi");
    this.messageForm.reset();               
    this.hubConnection.invoke('SendMessage')
      .catch(err => console.error('Erreur :', err));;
  }, error => {
    this._Toastr.error("Vous devez entrer un message avant de l'envoyer");
    
    console.error("Erreur lors de l'envoi du message :", error);
  });
  
}




// AfficherMessageGlobaux() {
//  this.listUserMessage = []; // Effacer la liste avant de la mettre à jour     
//  this._UtilisateurService.getAll().subscribe(res => {this.listUser = res}); // Récup de tout mes users
//  this._MessageGlobalService.GetAllMessageGlobal().subscribe(res => {this.listMessageGlobal = res}); //Récup de tout mes messages globaux
//   setTimeout (() => {
//   for (let u of this.listUser) {
//     this.listMessageGlobal.forEach(message => {
//       if(u.utilisateurId == message.expediteur){
//         const test = <UserMessage>{
//           utilisateurId:u.utilisateurId,
//           pdp: u.pdp,
//           message: message.message,
//           pseudo: u.pseudo,
//           heure: message.heure,
//           connecte: u.connecte
//         };       
//         if(test){
//           this.listUserMessage.push(test);       
//         }
//       }
//     })
//   }
// }, 500); 
// }

AfficherMessageGlobaux(){
 this.listUserMessage = []; // Effacer la liste avant de la mettre à jour     
 this._UtilisateurService.getAll().subscribe(res => {this.listUser = res}); // Récup de tout mes users
 this._MessageGlobalService.GetAllMessageGlobal().subscribe(res => {this.listMessageGlobal = res}); //Récup de tout mes messages globaux
 setTimeout (() => {
 for(let mess of this.listMessageGlobal){
    this.listUser.forEach(user => {
      if(mess.expediteur == user.utilisateurId){
        const test = <UserMessage>{
          utilisateurId:user.utilisateurId,
          pdp: user.pdp,
          message: mess.message,
          pseudo: user.pseudo,
          heure: mess.heure,
          connecte: user.connecte
        };  
        if(test){
          this.listUserMessage.push(test);       
        }   
      }
    })
 }
}, 500); 
}


affichageDernierMessage(){
  this._MessageGlobalService.GetLastMessageGlobal().subscribe(resmessage =>{
  this._UtilisateurService.getUser(resmessage.expediteur.toString()).subscribe( res => {let user = res;    
      const test = <UserMessage>{
        utilisateurId:user.utilisateurId,
        pdp: user.pdp,
        message: resmessage.message,
        pseudo: user.pseudo,
        heure: resmessage.heure,
        connecte: user.connecte  
      };      
      if (test) {
        this.listUserMessage.push(test);       
      }else{
        console.log("user null")
      }   
    });
  });
}



startSignalRConnection() {
  this.hubConnection = new HubConnectionBuilder()
    .withUrl('https://localhost:7250/SignalRHub')//, { accessTokenFactory: () => sessionStorage.getItem('token') ?? '', transport: HttpTransportType.WebSockets })
    .build();

  this.hubConnection.start()
    .then(() => console.log('Connexion établie avec le hub SignalR'))
    .catch(err => console.log('Erreur lors de la connexion au hub SignalR :', err));


  this.hubConnection.on('ReceiveNewMessageGlobal', () => {
      console.log('Nouveau message reçu');    
        this.affichageDernierMessage();                    
      console.log('cest sensé ce mettre a jour');  
  });

  this.hubConnection.on('UserLogin', () => {
    this.listUser =[];
    this._UtilisateurService.getAll().subscribe(res => {this.listUser = res}); // Récup de tout mes users
    
  });
  this.hubConnection.on('UserLogout',()=>{
    this.listUser =[];
    this._UtilisateurService.getAll().subscribe(res => {this.listUser = res}); // Récup de tout mes users
  });
 }
}

