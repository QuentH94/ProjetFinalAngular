import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageGlobal, UserMessage } from 'src/app/models/MessageGlobal-model';
import { Profil } from 'src/app/models/Utilisateur-model';
import { MessageGlobalService } from 'src/app/services/message-global.service';
import { UtilisateurService } from 'src/app/services/Utilisateur.service';
import { HttpTransportType, HubConnection, HubConnectionBuilder } from '@microsoft/signalr';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  listUser : Profil[]=[];
  listMessageGlobal : MessageGlobal[] = []
  listUserMessage : UserMessage[]=[]
  currentId : any
  helper = new JwtHelperService;
  message: string = '';
  messageForm: FormGroup;

  constructor(
    private _UtilisateurService: UtilisateurService,
    private _MessageGlobalService: MessageGlobalService,
    private fb: FormBuilder,
    private hubConnection: HubConnection
  ) {
    this.messageForm = this.fb.group({
      message: ''
    });
  }


  
  ngOnInit(): void {
   let token = this.helper.decodeToken(sessionStorage.getItem('token') ?? '')
   this.currentId = token.nameid;
   this._UtilisateurService.getAll().subscribe(res => {this.listUser = res})
   this._MessageGlobalService.GetAllMessageGlobal().subscribe(res => {this.listMessageGlobal = res})
   setTimeout (() => {
    
     this.AfficherMessageGlobaux();
    
 }, 300);   

 this.startSignalRConnection();


}

onSubmitMessage(): void {
  this.message = this.messageForm.value.message ?? '';
  this._MessageGlobalService.AddMessageGlobal(this.currentId, this.message).subscribe(() => {
    console.log("Envoi réussi");
    this.messageForm.reset();
    setTimeout(() => {
      this.AfficherMessageGlobaux();
    }, 300); // Attendre 500 millisecondes avant de mettre à jour la liste des messages
  }, error => {
    console.error("Erreur lors de l'envoi du message :", error);
  });

  this.hubConnection.invoke('SendMessage')
    .catch(err => console.error('Erreur :', err));;
}



AfficherMessageGlobaux() {
 this._UtilisateurService.getAll().subscribe(res => {this.listUser = res}); // Récup de tout mes users
 this._MessageGlobalService.GetAllMessageGlobal().subscribe(res => {this.listMessageGlobal = res}); //Récup de tout mes messages globaux
  this.listUserMessage = []; // Effacer la liste avant de la mettre à jour
  for (let u of this.listUser) {
    this.listMessageGlobal.forEach(message => {
      if (u.utilisateurId == message.expediteur) {
        const test = <UserMessage>{
          pdp: u.pdp,
          message: message.message,
          pseudo: u.pseudo,
          heure: message.heure,
          connecte: u.connecte
        };
        if (test) {
          this.listUserMessage.push(test);
        
        }
      }
    })
  }
}


startSignalRConnection() {
  this.hubConnection = new HubConnectionBuilder()
    .withUrl('https://localhost:7250/MessageGlobalHub', { accessTokenFactory: () => sessionStorage.getItem('token') ?? '', transport: HttpTransportType.WebSockets })
    .build();

  this.hubConnection.start()
    .then(() => console.log('Connexion établie avec le hub SignalR'))
    .catch(err => console.log('Erreur lors de la connexion au hub SignalR :', err));

  this.hubConnection.on('ReceiveMessage', () => {
    console.log('Nouveau message reçu');
 
      this.AfficherMessageGlobaux();
      console.log('cest sensé ce mettre a jour');
  // Mettre à jour la liste des messages après un délai de 500 millisecondes
  });
}

}

