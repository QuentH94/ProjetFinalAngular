import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfilComponent } from './components/profil/profil.component';
import { FormsModule } from "@angular/forms";
import { ProfilUsersComponent } from './components/profil-users/profil-users.component';
import { AmiComponent } from './components/ami/ami.component';
import { HubConnection } from '@microsoft/signalr';
import {NgPipesModule} from 'ngx-pipes';
import { MessagePriveComponent } from './components/message-prive/message-prive.component';





@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent, 
    LoginComponent, 
    HomeComponent, 
    NavbarComponent, ProfilComponent, ProfilUsersComponent, AmiComponent, MessagePriveComponent,
  
    
   
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
	  ToastrModule.forRoot({}),
    NgPipesModule,


  ],
  providers: [{ provide: HubConnection, useValue: HubConnection },],
  bootstrap: [AppComponent]
})
export class AppModule { }
