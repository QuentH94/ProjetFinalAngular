import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AmiComponent } from './components/ami/ami.component';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MessagePriveComponent } from './components/message-prive/message-prive.component';
import { ProfilUsersComponent } from './components/profil-users/profil-users.component';
import { ProfilComponent } from './components/profil/profil.component';
import { RegisterComponent } from './components/register/register.component';


const routes: Routes = [
  { path: 'Register', component: RegisterComponent },
  { path: 'Login', component: LoginComponent},
  { path: 'Home', component: HomeComponent},
  { path: 'Profil', component: ProfilComponent},
  { path: 'ProfilUsers', component: ProfilUsersComponent},
  { path : 'Ami', component: AmiComponent},
  { path : 'Message', component: MessagePriveComponent},
  { path: '', redirectTo: 'Login', pathMatch: 'full' },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
