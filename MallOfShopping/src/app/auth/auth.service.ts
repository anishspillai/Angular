import { Injectable } from '@angular/core';

import { Router } from  "@angular/router";
import { AngularFireAuth } from  "@angular/fire/auth";
import { User } from  'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;

  constructor(public  afAuth:  AngularFireAuth, public  router:  Router) {
    this.afAuth.authState.subscribe(user => {
      if (user){
        this.user = user;
        localStorage.setItem('application_Id', this.user.uid);
      }
    })
  }

  async login(email: string, password: string) {
    const result = await this.afAuth.signInWithEmailAndPassword(email, password);
    //await this.router.navigate(['home-page']);
  }

  async register(email: string, password: string) {
    await this.afAuth.createUserWithEmailAndPassword(email, password)
  }

  // https://www.techiediaries.com/angular-firebase/angular-9-firebase-authentication-email-google-and-password/
  async sendEmailVerification() {
    //await this.afAuth.auth.currentUser.sendEmailVerification()
    await this.router.navigate(['admin/verify-email']);
  }

  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
  }

  async logout(){
    await this.afAuth.signOut();
    localStorage.removeItem('application_Id');
    await this.router.navigate(['grocery-list']);
  }

  get isLoggedIn(): boolean {
    const  user  =  localStorage.getItem('application_Id')
    return  user  !==  null;
  }

  getUser() : string {
    return localStorage.getItem('application_Id')
  }

  getUserWithAllDetails(): User {
    return this.user
  }
}
