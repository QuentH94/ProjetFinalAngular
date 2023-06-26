import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import { UtilisateurService } from 'src/app/services/Utilisateur.service';
import { emailValidator } from './Validators/email-validator';
import { twoPasswordValidate } from './Validators/mdp-validator';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { pseudoValidate } from './Validators/pseudo-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;

  constructor (private fb: FormBuilder, private _UtilisateurService : UtilisateurService, private router: Router, private toats: ToastrService) { }

  ngOnInit (): void {
    this.form = this.fb.group({  
      pdp:[''],
      nom:[''],
      prenom:[''],
      pseudo:['', [pseudoValidate]],
      email: ['', [emailValidator]],
      mdp: ['', []],
      mdpConfirmation: ['', []],
    }, {
      validators: [twoPasswordValidate,]
    });
  }

  Register(){

    this._UtilisateurService.Register(this.form.value).subscribe(res => {this.toats.success('Inscription réussie')});     
    this.router.navigate(['Login']);
  }

}
