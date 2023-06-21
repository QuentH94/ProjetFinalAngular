import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfilUsersComponent } from './components/profil-users/profil-users.component';
import { ProfilComponent } from './components/profil/profil.component';
import { RegisterComponent } from './components/register/register.component';
import { Authguard } from './guard/authguard.guard';

const routes: Routes = [
  { path: 'Register', component: RegisterComponent },
  { path: 'Login', component: LoginComponent},
  { path: 'Home', component: HomeComponent},
  { path: 'Profil', component: ProfilComponent},
  { path: 'Profil2', component: ProfilUsersComponent},
  { path: '', redirectTo: 'Login', pathMatch: 'full' },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
