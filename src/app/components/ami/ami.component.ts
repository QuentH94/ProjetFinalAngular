import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';
import { Ami, Invitation, UserInvitation } from 'src/app/models/Ami-model';
import { Profil } from 'src/app/models/Utilisateur-model';
import { AmiService } from 'src/app/services/ami.service';
import { MessagePriveService } from 'src/app/services/message-prive.service';
import { UtilisateurService } from 'src/app/services/Utilisateur.service';

@Component({
  selector: 'app-ami',
  templateUrl: './ami.component.html',
  styleUrls: ['./ami.component.scss']
})
export class AmiComponent implements OnInit{
  constructor(private _UtilisateurService : UtilisateurService, 
              private _AmiService : AmiService, 
              private router: Router, 
              private hubConnection: HubConnection,
              private fb: FormBuilder,
              private _MessagePriveService : MessagePriveService,
              private _Toastr : ToastrService,){}


  amis!: Ami[];
  listAmis : Profil[] = [];
  userSearch! : Profil;
  currentId : string ='';
  helper = new JwtHelperService;
  demandeAmis : Invitation[] = [];
  listDemande : UserInvitation[] = [];
  messagePriveForm!: FormGroup;
  message: string = '';
  openform=false;
  amiId! : number;


  ngOnInit(): void {
    let token = this.helper.decodeToken(sessionStorage.getItem('token') ?? '')
    this.currentId = token.nameid;
    this._AmiService.GetAllFriend().subscribe({ next : (res) => this.amis = res});
    this._AmiService.GetAllInvitation().subscribe(res => {this.demandeAmis =res});
    setTimeout (() => {
      this.Ami();     
      this.demandeAmi();
    }, 400);
  

    this.startSignalRConnection();

    this.messagePriveForm = this.fb.group({     
      message: ['']
    });

  }
  messagePrive(){
    this.message = this.messagePriveForm.value.message ?? '';
    this._MessagePriveService.AddMessagePrive(Number(this.currentId),this.amiId,this.message).subscribe(res => {
    this._Toastr.info("Message envoyé")});
    this.messagePriveForm.reset(); 
    this.openform=false;
    }

    onClickOpenForm(amiId : number){
      this.amiId = amiId;
      this.openform=true;
      }

  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/Ami']);
}

  async demandeAmi(){
    
    if(this.demandeAmis){
      for(const demande of this.demandeAmis){
        if(this.currentId == demande.utilisateur1.toString() || this.currentId == demande.utilisateur2.toString() && this.currentId != demande.demandeur.toString()){
          if(this.currentId == demande.utilisateur1.toString()){
            const user = await this._UtilisateurService.getUser(demande.utilisateur2.toString()).toPromise()
            if(user){
             const userInvitation = <UserInvitation> {id_Invitation : demande.id_Invitation, pseudo : user.pseudo, email : user.email, pdp : user.pdp};
              this.listDemande.push(userInvitation);
            }
          }else{
            const user = await this._UtilisateurService.getUser(demande.utilisateur1.toString()).toPromise()
            if(user){
              const userInvitation = <UserInvitation> {id_Invitation : demande.id_Invitation, pseudo : user.pseudo, email : user.email, pdp : user.pdp};
              this.listDemande.push(userInvitation);
            }
          }
        }
      }
    }
  }


  Accepter(id : number){
    this._AmiService.Accepted(id).subscribe(); 
    
    setTimeout (() => {
      this.reloadComponent();
      
   }, 80);    
   
    
  }
  Refuser(id : number){
    this._AmiService.Refused(id).subscribe();
    setTimeout (() => {
      this.reloadComponent();
      
   }, 80);

  }

  async Ami() {
    
    if (this.amis) {
      for (const ami of this.amis) {
        if (this.currentId == ami.utilisateur1.toString() || this.currentId == ami.utilisateur2.toString()) {
          if (this.currentId == ami.utilisateur1.toString()) {
            const user = await this._UtilisateurService.getUser(ami.utilisateur2.toString()).toPromise();
            if (user) {
              this.listAmis.push(user);
            }
          } else {
            const user = await this._UtilisateurService.getUser(ami.utilisateur1.toString()).toPromise();
            if (user) {
              this.listAmis.push(user);
            }
          }
        }
      }     
    }
  }


  voirProfil(id:number){
    this._UtilisateurService.getUser(id.toString()).subscribe(res => {
      this.userSearch = res;
      if(this.userSearch != null){
        sessionStorage.setItem('userSearch', this.userSearch.utilisateurId.toString());
        this.router.navigate(['/ProfilUsers']);    
      }
    })
  }
  startSignalRConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:7250/SignalRHub')//, { accessTokenFactory: () => sessionStorage.getItem('token') ?? '', transport: HttpTransportType.WebSockets })
      .build();

    this.hubConnection.start()
      .then(() => console.log('Connexion établie avec le hub SignalR'))
      .catch(err => console.log('Erreur lors de la connexion au hub SignalR :', err));
  
    this.hubConnection.on('UserLogin', () => {
         
      this.amis = [];
      setTimeout (() => {
        this.Ami();          
      }, 300); 
     
     console.log('un ami vient de se co');
    });
    this.hubConnection.on('UserLogout',()=>{
       
      this.amis = [];
      setTimeout (() => {
        this.Ami();            
      }, 300); 
    
     console.log('un ami se déco');
    })
   }

  
  supprimerAmi(ami : number){
    this._AmiService.DeleteFriend(Number(this.currentId),ami).subscribe();
    setTimeout (() => {
      this.reloadComponent();     
   }, 80);
  }

}
