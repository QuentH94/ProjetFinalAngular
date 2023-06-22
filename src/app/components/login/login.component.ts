import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
  
  constructor (private fb: FormBuilder, private _UtilisateurService : UtilisateurService, private router: Router, private toats: ToastrService) { 
    sessionStorage.clear();
  }
  ngOnInit (): void {
    this.form = this.fb.group({  
     
      email: [''],
      mdp: [''],
  
    });
  }

  Login(){

    this._UtilisateurService.Login(this.form.value).subscribe((res : string) => {
    sessionStorage.setItem("token", res);
    this.router.navigate(['Home']);  
    },
       (error) => {
        this.form.setErrors({ unauthenticated: true });
      });   
     
  


  }
}
