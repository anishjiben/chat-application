import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { UsersListComponent } from './home/users-list/users-list.component';
import { ChatWindowComponent } from './home/chat-window/chat-window.component';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext'
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ChatService } from './services/chat.service';
import { AuthGuardService } from './services/auth-guard.service';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyC8rpVTrPwLeGma0p3nvU9D8yfbXnOfn0A",
    authDomain: "angularchat-19de1.firebaseapp.com",
    projectId: "angularchat-19de1",
    storageBucket: "angularchat-19de1.appspot.com",
    messagingSenderId: "26141767188",
    appId: "1:26141767188:web:db5785782471ba2a369901"
  }
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    UsersListComponent,
    ChatWindowComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ToastModule,
    BrowserAnimationsModule,
    Ng2SearchPipeModule
  ],
  providers: [AuthService, ChatService, AuthGuardService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
