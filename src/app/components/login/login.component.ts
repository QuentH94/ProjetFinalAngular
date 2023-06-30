import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';
import { UtilisateurService } from 'src/app/services/Utilisateur.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  implements OnInit {
  form!: FormGroup;
  UserData : any;
  
  constructor (private fb: FormBuilder, private _UtilisateurService : UtilisateurService, private router: Router, private toats: ToastrService, private hubConnection: HubConnection,) { 
    sessionStorage.clear();
  }
  ngOnInit (): void {
    this.form = this.fb.group({  
     
      email: [''],
      mdp: [''],
  
    });
    this.startSignalRConnection();
  }

  Login(){

    this._UtilisateurService.Login(this.form.value).subscribe((res : string) => {
    sessionStorage.setItem("token", res);
    this.router.navigate(['Home']);  
    this.hubConnection.invoke('Login').catch(error => {console.log(error)});
  },
  (error) => {
    this.form.setErrors({ unauthenticated: true });
  });   
  
  }

  
  startSignalRConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:7250/SignalRHub')//, { accessTokenFactory: () => sessionStorage.getItem('token') ?? '', transport: HttpTransportType.WebSockets })
      .build();
  
    this.hubConnection.start()
      .then(() => console.log('Connexion établie avec le hub SignalR'))
      .catch(err => console.log('Erreur lors de la connexion au hub SignalR :', err));
  
   }
}
