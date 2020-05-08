import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  isLoginOperation = true

  auth: AuthService

  userId: string
  password: string


  userEmails = new FormGroup({
    primaryEmail: new FormControl('')
  });

  constructor(auth: AuthService) {
    this.auth = auth
  }

  ngOnInit(): void {
  }

  registerNewUser(): void {
    this.isLoginOperation = false
  }

  loginUser() : void {
    this.auth.login(this.userId, this.password).then(r => console.log(JSON.parse(localStorage.getItem('user'))))
  }

}
