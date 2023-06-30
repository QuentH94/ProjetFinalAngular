import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Ami, Invitation, UserInvitation } from 'src/app/models/Ami-model';
import { Profil } from 'src/app/models/Utilisateur-model';
import { AmiService } from 'src/app/services/ami.service';
import { UtilisateurService } from 'src/app/services/Utilisateur.service';

@Component({
  selector: 'app-ami',
  templateUrl: './ami.component.html',
  styleUrls: ['./ami.component.scss']
})
export class AmiComponent implements OnInit{
  constructor(private _UtilisateurService : UtilisateurService, private _AmiService : AmiService, private router: Router, private hubConnection: HubConnection,){}
  amis!: Ami[];
  listAmis : Profil[] = [];
  userSearch! : Profil;
  id : string ='';
  helper = new JwtHelperService;
  demandeAmis : Invitation[] = [];
  listDemande : UserInvitation[] = [];
 


  ngOnInit(): void {
    let token = this.helper.decodeToken(sessionStorage.getItem('token') ?? '')
    this.id = token.nameid;
    this._AmiService.GetAllFriend().subscribe({ next : (res) => this.amis = res});
    this._AmiService.GetAllInvitation().subscribe(res => {this.demandeAmis =res});
    setTimeout (() => {
      this.Ami();     
      this.demandeAmi();
    }, 300);
  

    this.startSignalRConnection();

  }
 
  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/Ami']);
}

  async demandeAmi(){
    
    if(this.demandeAmis){
      for(const demande of this.demandeAmis){
        if(this.id == demande.utilisateur1.toString() || this.id == demande.utilisateur2.toString() && this.id != demande.demandeur.toString()){
          if(this.id == demande.utilisateur1.toString()){
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
        if (this.id == ami.utilisateur1.toString() || this.id == ami.utilisateur2.toString()) {
          if (this.id == ami.utilisateur1.toString()) {
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
      }, 100); 
     
     console.log('un ami vient de se co');
    });
    this.hubConnection.on('UserLogout',()=>{
       
      this.amis = [];
      setTimeout (() => {
        this.Ami();            
      }, 100); 
    
     console.log('un ami se déco');
    })
   }

  message(){

  }
  supprimerAmi(ami : number){
    this._AmiService.DeleteFriend(Number(this.id),ami).subscribe();
    setTimeout (() => {
      this.reloadComponent();     
   }, 80);
  }

}
