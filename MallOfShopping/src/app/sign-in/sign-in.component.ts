import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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

  dialogHeader: string = "Login user"

  errorMessage: string

  successMessage: string


  isResetPasswordDialog: boolean = false


  @Input() loadLoginPage: boolean

  @Output() closeLoginDialogEvent = new EventEmitter()

  triggerEventForClosingDialog() {
    this.closeLoginDialogEvent.emit(false)
  }

  userEmails = new FormGroup({
    primaryEmail: new FormControl('')
  });

  constructor(auth: AuthService) {
    this.auth = auth
  }

  ngOnInit(): void {

  }

  setPasswordResetProperties() {
    this.isResetPasswordDialog = true
  }

  setRegisterUserPageProperties(): void {
    this.isLoginOperation = false
    this.dialogHeader = "Register new user"
    this.clearMessages()
  }

  cancelPasswordResetDialog() {
    this.isResetPasswordDialog = false
    this.loadLoginPageProperties()
    this.clearMessages()
  }

  loadLoginPageProperties() {
    this.isLoginOperation = true
    this.dialogHeader = "Login user"
    this.clearMessages()
  }

  private clearMessages() {
    this.errorMessage = null
    this.successMessage = null
  }

  loginUser() : void {

    this.errorMessage = null

    this.auth.login(this.userId, this.password)
      .then(() => {
        this.triggerEventForClosingDialog()
      })
      .catch((serverLoginError: any) => {
        this.errorMessage = serverLoginError.toString()
      });
  }

  registerUser() : void {

    this.errorMessage = null

    this.auth.register(this.userId, this.password)
      .then(() => {
        this.triggerEventForClosingDialog()
      })
      .catch((serverLoginError: any) => {
        this.errorMessage = serverLoginError.toString()
      });
  }

  resetUserPassword() {

    this.errorMessage = null
    this.successMessage = null

    this.auth.sendPasswordResetEmail(this.userId)
      .then(() => {
        this.successMessage = "Password reset link is sent to the email id"
      })
      .catch((serverLoginError: any) => {
        this.errorMessage = serverLoginError.toString()
      });
  }

}
