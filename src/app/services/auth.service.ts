import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseDatabase } from 'angularfire2';
import { from, Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser;

  constructor(private angularFireAuth: AngularFireAuth) { }


  public login(email, password): Observable<any> {
    return from(
      this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
    );
  }

  public signup(email, password): Observable<any> {
    return from(
      this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
    );
  }

  public updateUsername(userName: string): Observable<any> {
    return from(
      this.angularFireAuth.auth.currentUser.updateProfile({
        displayName: userName
      })
    );
  }

  public setCurrentUser(currentUser: any): void {
    this.currentUser = currentUser;
  }

}
